import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function useSeatManager(tripId?: string) {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [temporaryReservedSeats, setTemporaryReservedSeats] = useState<number[]>([]); // Places réservées via WebSocket
    const [permanentOccupiedSeats, setPermanentOccupiedSeats] = useState<number[]>([]); // Places définitivement occupées du voyage
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    // WebSocket refs
    const stompClient = useRef<any>(null);
    const connectionRetries = useRef(0);
    const maxRetries = 3;

    // Garder une trace des places que NOUS avons sélectionnées
    const mySelectedSeats = useRef<number[]>([]);

    // Initialiser WebSocket si tripId est fourni
    useEffect(() => {
        if (!tripId) return;

        setIsConnecting(true);
        setIsConnected(false);

        const connectWebSocket = () => {
            const client = new Client({
                webSocketFactory: () => new SockJS("https://agence-voyage.ddns.net/api/ws"),
                onConnect: () => {
                    console.log('WebSocket connecté');
                    setIsConnected(true);
                    setIsConnecting(false);
                    connectionRetries.current = 0;

                    // S'abonner aux mises à jour
                    client.subscribe(`/topic/voyage.${tripId}`, (message) => {
                        const updates = JSON.parse(message.body);
                        if (Array.isArray(updates)) {
                            syncWithServer(updates);
                        }
                    });

                    // Demander l'état initial des places temporaires
                    setTimeout(() => {
                        requestInitialState();
                    }, 500);
                },
                onStompError: (error) => {
                    console.error('WebSocket error:', error);
                    setIsConnected(false);
                    setIsConnecting(false);
                    handleReconnection();
                },
                onWebSocketError: (error) => {
                    console.error('WebSocket connection error:', error);
                    setIsConnected(false);
                    setIsConnecting(false);
                    handleReconnection();
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000
            });

            client.activate();
            stompClient.current = client;
        };

        const handleReconnection = () => {
            if (connectionRetries.current < maxRetries) {
                connectionRetries.current++;
                console.log(`Tentative de reconnexion ${connectionRetries.current}/${maxRetries}`);
                setTimeout(() => {
                    setIsConnecting(true);
                    connectWebSocket();
                }, 2000 * connectionRetries.current);
            } else {
                console.error('Échec de la connexion WebSocket après plusieurs tentatives');
                setIsConnecting(false);
            }
        };

        connectWebSocket();

        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, [tripId]);

    // Demander l'état initial des places temporaires
    const requestInitialState = () => {
        if (stompClient.current && tripId && isConnected) {
            stompClient.current.publish({
                destination: `/app/voyage/${tripId}/get-state`,
                body: JSON.stringify({})
            });
        }
    };

    // Synchroniser avec le serveur (SEULEMENT les places temporaires)
    const syncWithServer = (updates: any[]) => {
        const serverTemporaryReservedSeats = updates
            .filter(update => update.status === 'RESERVED')
            .map(update => update.placeNumber);

        // Mettre à jour SEULEMENT les places temporairement réservées par d'autres
        setTemporaryReservedSeats(prev => {
            const otherUsersReservedSeats = serverTemporaryReservedSeats.filter(
                seatNumber => !mySelectedSeats.current.includes(seatNumber)
            );
            return otherUsersReservedSeats;
        });
    };

    function handleSeatClick(seatNumber: number): void {
        // Empêcher le clic sur les places définitivement occupées ou temporairement réservées
        if (permanentOccupiedSeats.includes(seatNumber) || temporaryReservedSeats.includes(seatNumber)) {
            return;
        }

        const isCurrentlySelected = selectedSeats.includes(seatNumber);

        if (isCurrentlySelected) {
            // Désélectionner la place
            setSelectedSeats(prev => prev.filter(seat => seat !== seatNumber));
            mySelectedSeats.current = mySelectedSeats.current.filter(seat => seat !== seatNumber);

            // Envoyer FREE au serveur
            if (stompClient.current && isConnected && tripId) {
                stompClient.current.publish({
                    destination: `/app/voyage/${tripId}/reserver`,
                    body: JSON.stringify({ placeNumber: seatNumber, status: 'FREE' })
                });
            }
        } else {
            // Sélectionner la place
            setSelectedSeats(prev => [...prev, seatNumber]);
            mySelectedSeats.current = [...mySelectedSeats.current, seatNumber];

            // Envoyer RESERVED au serveur
            if (stompClient.current && isConnected && tripId) {
                stompClient.current.publish({
                    destination: `/app/voyage/${tripId}/reserver`,
                    body: JSON.stringify({ placeNumber: seatNumber, status: 'RESERVED' })
                });
            }
        }
    }

    function getSeatClass(seatNumber: number): string {
        const baseClass = "lg:w-12 lg:h-12 w-10 h-10 border-2 rounded-lg transition-all duration-200 ";

        // Places définitivement occupées (du voyage) -> TOUJOURS rouges foncées
        if (permanentOccupiedSeats.includes(seatNumber)) {
            return baseClass + "border-red-600 bg-red-400 cursor-not-allowed opacity-90";
        }

        // Si c'est une place que NOUS avons sélectionnée -> verte
        if (selectedSeats.includes(seatNumber)) {
            return baseClass + "border-green-500 bg-green-300 cursor-pointer hover:bg-green-400";
        }

        // Places temporairement réservées par d'autres (WebSocket) -> oranges
        if (temporaryReservedSeats.includes(seatNumber)) {
            return baseClass + "border-orange-500 bg-orange-300 cursor-not-allowed";
        }

        // Place libre -> grise
        return baseClass + "border-gray-400 bg-gray-200 cursor-pointer hover:bg-gray-300";
    }

    // Libérer toutes nos places sélectionnées
    const releaseAllSeats = () => {
        if (stompClient.current && isConnected && tripId) {
            mySelectedSeats.current.forEach(seatNumber => {
                stompClient.current.publish({
                    destination: `/app/voyage/${tripId}/reserver`,
                    body: JSON.stringify({ placeNumber: seatNumber, status: 'FREE' })
                });
            });
        }
        setSelectedSeats([]);
        mySelectedSeats.current = [];
    };

    return {
        selectedSeats,
        temporaryReservedSeats,
        permanentOccupiedSeats,
        isConnecting,
        isConnected,
        handleSeatClick,
        getSeatClass,
        setSelectedSeats,
        setPermanentOccupiedSeats, // Pour définir les places définitivement occupées du voyage
        releaseAllSeats,
        requestInitialState
    };
}