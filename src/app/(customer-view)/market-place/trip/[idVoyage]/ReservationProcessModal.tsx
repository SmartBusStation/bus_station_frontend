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
    onCloseAction: ()=>void,
    tripDetails: Trip,
    openPaymentModalAction: ()=>void,
}

export default function ReservationProcessModal({  onCloseAction, tripDetails, openPaymentModalAction }: ReservationProcessModalPropsInterface) {


    const reservationManager = useReservation(tripDetails);
    return (
        <>
            <div className="bg-white relative lg:rounded-xl  rounded-xl lg:max-w-5xl md:max-w-[1000px] sm:max-w-[370px] max-w-[330px] lg:h-[90vh] h-[75vh] overflow-y-auto">
                {reservationManager.step === 1 && (
                    <ReservationStep1
                        totalPrice={reservationManager.totalPrice}
                        tripDetails={tripDetails}
                        setSelectedSeats={reservationManager.setSelectedSeats}
                        selectedSeats={reservationManager.selectedSeats}
                        onClose={onCloseAction}
                        onContinue={() => reservationManager.setStep(2)}
                    />
                )}
                {reservationManager.step === 2 && (
                    <ReservationStep2
                        onBack={reservationManager.onBack}
                        onClose={() => {
                            onCloseAction();
                            reservationManager.setStep(1);
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
                        onClose={onCloseAction}
                        passengersData={reservationManager.passengersData}
                        setStep={reservationManager.setStep}
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
                        onCloseAction()
                        openPaymentModalAction()
                    }}
                />
            </TransparentModal>
        </>
    )
}

