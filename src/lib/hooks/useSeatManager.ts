import { useState } from 'react';

export function useSeatManager ()  {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [reservedSeats, setReservedSeats] = useState<number[]>([]);



    function handleSeatClick  (seatNumber: number): void {
        if (reservedSeats.includes(seatNumber)) return;
        setSelectedSeats(prev =>
            prev.includes(seatNumber) ? prev.filter(seat => seat !== seatNumber) : [...prev, seatNumber]
        );
    }

    function getSeatClass  (seatNumber: number): string  {
        const baseClass = "lg:w-12 lg:h-12 w-10 h-10 border-2 rounded-lg ";
        if (reservedSeats.includes(seatNumber)) {
            return baseClass + "border-red-500 bg-red-300 cursor-not-allowed";
        }
        if (selectedSeats.includes(seatNumber)) {
            return baseClass + "border-green-500 bg-green-300";
        }
        return baseClass + "border-gray-400 bg-gray-200 cursor-pointer";
    }

    return {
        selectedSeats,
        reservedSeats,
        handleSeatClick,
        getSeatClass,
        setSelectedSeats,
        setReservedSeats
    };
}
