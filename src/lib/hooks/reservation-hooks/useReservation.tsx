"use client";

import {useMemo, useState} from "react";
import {FaHouse} from "react-icons/fa6";
import {FaCalendar, FaMoneyBill} from "react-icons/fa";
import {formatDateOnly} from "@/lib/services/date-services";
import {MapPin} from "lucide-react";
import {Trip} from "@/lib/types/models/Trip";
import {PassengerFormType} from "@/lib/types/schema/passengerReservationSchema";
import {useBusStation} from "@/context/Provider";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";


export function useReservation(tripDetails?: Trip)
{

    const [step, setStep] = useState<number>(1);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [passengersData, setPassengersData] = useState<PassengerFormType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [canOpenErrorModal, setCanOpenErrorModal] = useState<boolean>(false);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState<boolean>(false);

    const totalPrice = useMemo(() => {
        if (selectedSeats.length > 0 && tripDetails?.prix) {
            return selectedSeats.length * tripDetails.prix;
        }
        return 0;
    }, [selectedSeats.length, tripDetails?.prix]);


    const [reservationPrice, setReservationPrice] = useState<number>(0);


    const reservationDetails = [
        { icon: FaHouse, label: "Travel agency", value: tripDetails?.nomAgence },
        { icon: FaCalendar, label: "Travel date", value: formatDateOnly(tripDetails?.dateDepartPrev || "")},
        { icon: MapPin, label: "Departure location", value: tripDetails?.lieuDepart },
        { icon: MapPin, label: "Arrival Location", value: tripDetails?.lieuArrive },
        { icon: FaMoneyBill, label: "Unit price", value: tripDetails?.prix + " FCFA" },
    ];







    function onBack() {
        setStep(1)
    }






    const totalPassengers = selectedSeats.length
    const totalLuggage = passengersData.reduce(
        (sum, passenger) => sum + passenger.nbrBaggage,
        0,
    );




   // const totalPrice = tripDetails.prix * totalPassengers
    const { userData } = useBusStation();





    async function bookTrip() {
        setIsLoading(true)
        const data = {
            nbrPassager: totalPassengers,
            montantPaye: 0,
            idUser: userData?.userId,
            idVoyage: tripDetails && tripDetails.idVoyage,
            passagerDTO: passengersData,
        }

        console.log(data)
        try {
            const response = await axiosInstance.post("/reservation/reserver", data)
            if (response.status === 201) {
                setIsLoading(false);
                console.log(response.data);
                setReservationPrice(totalPrice);
                localStorage.setItem('idCurrentReservation', response?.data?.idReservation);
                setCanOpenErrorModal(false);
                setErrorMessage("");
                setSuccessMessage("Reservation created successfully and attempted for your confirmation");
                setCanOpenErrorModal(false);
                setCanOpenSuccessModal(true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setSuccessMessage("");
            setErrorMessage("Something went wrong when booking this trip, please try again later !");
            setCanOpenSuccessModal(false);
            setCanOpenErrorModal(true);
        }
    }







    return{
        selectedSeats,
        step,
        passengersData,
        isLoading,
        errorMessage,
        successMessage,
        canOpenErrorModal,
        canOpenSuccessModal,
        setCanOpenErrorModal,
        setCanOpenSuccessModal,
        setPassengersData,
        setSelectedSeats,
        onBack,
        setStep,
        setSuccessMessage,
        setErrorMessage,
        setIsLoading,
        reservationDetails,
        totalPrice,
        totalLuggage,
        bookTrip,
        totalPassengers,


    }
}