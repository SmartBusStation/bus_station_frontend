"use client";

import {useEffect, useState} from "react";
import {FaHouse} from "react-icons/fa6";
import {FaCalendar, FaMoneyBill} from "react-icons/fa";
import {formatDateOnly} from "@/lib/services/date-services";
import {MapPin} from "lucide-react";
import {Trip} from "@/lib/types/models/Trip";
import {PassengerFormType} from "@/lib/types/schema/passengerReservationSchema";


export function useReservation(tripDetails?: Trip)
{

    const [step, setStep] = useState<number>(1);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [passengersData, setPassengersData] = useState<Record<number, PassengerFormType>>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [canOpenErrorModal, setCanOpenErrorModal] = useState<boolean>(false);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const reservationDetails = [
        { icon: FaHouse, label: "Travel agency", value: tripDetails?.nomAgence },
        { icon: FaCalendar, label: "Travel date", value: formatDateOnly(tripDetails?.dateDepartPrev || "")},
        { icon: MapPin, label: "Departure location", value: tripDetails?.lieuDepart },
        { icon: MapPin, label: "Arrival Location", value: tripDetails?.lieuArrive },
        { icon: FaMoneyBill, label: "Unit price", value: tripDetails?.prix + " FCFA" },
    ];

    useEffect(() => {
        if (selectedSeats.length > 0 && tripDetails?.prix) {
            setTotalPrice(selectedSeats.length * tripDetails?.prix)
        }
        if (selectedSeats.length === 0) {
            setTotalPrice(0)
        }
    }, [selectedSeats.length, tripDetails?.prix])


    function onBack() {
        setStep(1)
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
    }
}