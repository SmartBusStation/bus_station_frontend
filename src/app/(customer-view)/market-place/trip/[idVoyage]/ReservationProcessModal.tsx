"use client"

import React, { useState } from "react"
import ReservationStep1 from "./ReservationStep1"
import ReservationStep2 from "./ReservationStep2"
import ReservationStep3 from "./ReservationStep3"
import TransparentModal from "@/modals/TransparentModal";
import {SuccessModal} from "@/modals/SuccessModal";
import ErrorModal from "@/modals/ErrorModal";
import Loader from "@/modals/Loader";
import {Trip} from "@/lib/types/models/Trip";


export interface ReservationProcessModalPropsInterface {
    onClose: ()=>void,
    tripDetails: Trip,
    openPaymentModal: ()=>void,
    setReservationPrice: (param: number)=> void,
}



export default function ReservationProcessModal({  onClose, tripDetails, openPaymentModal, setReservationPrice }: ReservationProcessModalPropsInterface) {
    const [step, setStep] = useState(1)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [passengersData, setPassengersData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [canOpenErrorModal, setCanOpenErrorModal] = useState(false)
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState(false)

    function onBack() {
        setStep(1)
    }


    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300 lg:p-4 p-0">
                <div className="bg-white relative lg:rounded-xl lg:w-full lg:max-w-5xl w-screen max-h-[90vh] overflow-y-auto">
                    {step === 1 && (
                        <ReservationStep1
                            tripDetails={tripDetails}
                            setSelectedSeats={setSelectedSeats}
                            selectedSeats={selectedSeats}
                            onClose={onClose}
                            onContinue={() => setStep(2)}
                        />
                    )}
                    {step === 2 && (
                        <ReservationStep2
                            onBack={onBack}
                            onClose={() => {
                                onClose()
                                setStep(1)
                            }}
                            selectedSeats={selectedSeats}
                            setStep={setStep}
                            tripDetails={tripDetails}
                            setPassengers={setPassengersData}
                        />
                    )}
                    {step === 3 && (
                        <ReservationStep3
                            selectedSeats={selectedSeats}
                            tripDetails={tripDetails}
                            onClose={onClose}
                            passengersData={passengersData}
                            setStep={setStep}
                            setCanOpenErrorModal={setCanOpenErrorModal}
                            setCanOpenSuccessModal={setCanOpenSuccessModal}
                            setErrorMessage={setErrorMessage}
                            setSuccessMessage={setSuccessMessage}
                            setIsLoading={setIsLoading}
                            setReservationPrice={setReservationPrice}
                        />
                    )}
                </div>
            </div>
            {isLoading && (
                <TransparentModal isOpen={isLoading}>
                    <Loader/>
                </TransparentModal>
            )
            }
            <TransparentModal isOpen={canOpenErrorModal}>
                <ErrorModal
                    onCloseErrorModal={() => setCanOpenErrorModal(false)}
                    message={errorMessage}
                />
            </TransparentModal>
            <TransparentModal isOpen={canOpenSuccessModal}>
                <SuccessModal
                    canOpenSuccessModal={setCanOpenSuccessModal}
                    message={successMessage}
                    makeAction={() => {
                        setStep(1)
                        onClose()
                        openPaymentModal()
                    }}
                />
            </TransparentModal>
        </>
    )
}

