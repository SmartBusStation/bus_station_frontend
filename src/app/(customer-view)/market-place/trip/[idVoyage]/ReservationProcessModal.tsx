"use client"

import React from "react"
import ReservationStep1 from "./ReservationStep1"
import ReservationStep2 from "./ReservationStep2"
import ReservationStep3 from "./ReservationStep3"
import TransparentModal from "@/modals/TransparentModal";
import {SuccessModal} from "@/modals/SuccessModal";
import ErrorModal from "@/modals/ErrorModal";
import Loader from "@/modals/Loader";
import {Trip} from "@/lib/types/models/Trip";
import {useReservation} from "@/lib/hooks/reservation-hooks/useReservation";


export interface ReservationProcessModalPropsInterface {
    onClose: ()=>void,
    tripDetails: Trip,
    openPaymentModal: ()=>void,
    setReservationPrice: (param: number)=> void,
}

export default function ReservationProcessModal({  onClose, tripDetails, openPaymentModal, setReservationPrice }: ReservationProcessModalPropsInterface) {


    const reservationManager = useReservation(tripDetails);
    return (
        <>
            <div className="bg-white relative lg:rounded-xl  rounded-xl lg:max-w-5xl  max-w-[380px] lg:h-[90vh] h-[75vh] overflow-y-auto">
                {reservationManager.step === 1 && (
                    <ReservationStep1
                        tripDetails={tripDetails}
                        setSelectedSeats={reservationManager.setSelectedSeats}
                        selectedSeats={reservationManager.selectedSeats}
                        onClose={onClose}
                        onContinue={() => reservationManager.setStep(2)}
                    />
                )}
                {reservationManager.step === 2 && (
                    <ReservationStep2
                        onBack={reservationManager.onBack}
                        onClose={() => {
                            onClose()
                            reservationManager.setStep(1)
                        }}
                        selectedSeats={reservationManager.selectedSeats}
                        setStep={reservationManager.setStep}
                        tripDetails={tripDetails}
                        setPassengers={reservationManager.setPassengersData}
                    />
                )}
                {reservationManager.step === 3 && (
                    <ReservationStep3
                        selectedSeats={reservationManager.selectedSeats}
                        tripDetails={tripDetails}
                        onClose={onClose}
                        passengersData={reservationManager.passengersData}
                        setStep={reservationManager.setStep}
                        setCanOpenErrorModal={reservationManager.setCanOpenErrorModal}
                        setCanOpenSuccessModal={reservationManager.setCanOpenSuccessModal}
                        setErrorMessage={reservationManager.setErrorMessage}
                        setSuccessMessage={reservationManager.setSuccessMessage}
                        setIsLoading={reservationManager.setIsLoading}
                        setReservationPrice={setReservationPrice}
                    />
                )}
            </div>


            <TransparentModal isOpen={reservationManager.isLoading}>
                <Loader/>
            </TransparentModal>

            <TransparentModal isOpen={reservationManager.canOpenErrorModal}>
                <ErrorModal
                    onCloseErrorModal={() => reservationManager.setCanOpenErrorModal(false)}
                    message={reservationManager.errorMessage}
                />
            </TransparentModal>

            <TransparentModal isOpen={reservationManager.canOpenSuccessModal}>
                <SuccessModal
                    canOpenSuccessModal={reservationManager.setCanOpenSuccessModal}
                    message={reservationManager.successMessage}
                    makeAction={() => {
                        reservationManager.setStep(1)
                        onClose()
                        openPaymentModal()
                    }}
                />
            </TransparentModal>
        </>
    )
}

