"use client";

import constate from 'constate';
import {useEffect, useMemo, useState} from "react";
import {loginSchema, LoginSchemaType} from "@/lib/types/schema/loginSchema";
import {Customer} from "@/lib/types/models/BusinessActor";
import {getConnectedUser, onLogin} from "@/lib/services/businessActor-service";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {tokenKeyName} from "@/lib/services/axios-services/interceptors/auth-interceptor";




export const [BusStationProvider, useBusStation] = constate(useBusStationProvider, value=> value.authMethods);


function useBusStationProvider() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<Customer|null>(null);
    const [axiosErrors, setAxiosErrors] = useState<string|null>(null);
    const [isCustomerAuthenticated, setIsCustomerAuthenticated] = useState<boolean>(false);
    const [isAgencyConnected, setIsAgencyConnected] = useState<boolean>(false);
    const [isOrganizationConnected, setIsOrganizationConnected] = useState<boolean>(false);



    /*** Zod variables for login Process ***/
    const {register, handleSubmit, formState: { errors }} = useForm<LoginSchemaType>(
        {
            resolver: zodResolver(loginSchema),
        });


    function saveAuthParams(token:string, expirationDate?:string)
    {
        localStorage.setItem(tokenKeyName, token);
        if (expirationDate) localStorage.setItem("bus_station_token_expirationDate", expirationDate);
    }


    function clearLocaleStorage()
    {
        localStorage.removeItem(tokenKeyName);
        localStorage.removeItem("bus_station_token_expirationDate");

    }



    function logout()
    {
        clearLocaleStorage();
        window.location.href="/"
    }

    async function login(data: LoginSchemaType): Promise<void>
    {
        console.log(data);
        setIsCustomerAuthenticated(false);
        setIsAgencyConnected(false);
        setUserData(null);
        setIsLoading(true);
        await onLogin(data)
            .then((result) => {
                if(result)
                {
                    setUserData(result);
                    saveAuthParams(result?.token);
                    if(result?.role.includes("USAGER"))
                    {
                        setIsCustomerAuthenticated(true);
                        window.location.href = "/market-place";
                    }
                    if (result?.role.includes("ORGANISATION"))
                    {
                        setIsAgencyConnected(true);
                        setIsOrganizationConnected(true);
                        window.location.href = "/dashboard";
                    }
                    if (result?.role.includes("AGENCE_VOYAGE"))
                    {
                        setIsAgencyConnected(true);
                        window.location.href = "/dashboard";
                    }
                }
                else
                {
                    setAxiosErrors("Something went wrong, please try again !");
                }

            })
            .catch((error): void => {
                if(error?.status === 401 || error?.status === 403)
                {
                    setAxiosErrors("Wrong credentials, please try again !");
                }
                else if (error?.status === 404)
                {
                    setAxiosErrors("User not found, please try again !");
                }
                else
                {
                    setAxiosErrors("Something went wrong, please try again !");
                }
            })
            .finally(()=> setIsLoading(false));
    }



    async function getCurrentUser():Promise<void>
    {
        const token = localStorage.getItem(tokenKeyName) as string;
        if(token === "" &&  token === undefined)
        {
            setIsCustomerAuthenticated(false);
            setIsAgencyConnected(false);
            setUserData(null);
        }
        else
        {
            await getConnectedUser(token)
                .then((result) => {
                    if(result)
                    {
                        if(result?.role.includes("USAGER"))
                        {
                            setIsCustomerAuthenticated(true);
                            setIsAgencyConnected(false);
                        }
                        else
                        {
                            setIsAgencyConnected(true);
                            setIsCustomerAuthenticated(false);
                        }
                        setUserData(result);
                    }
                    else
                    {
                        setIsCustomerAuthenticated(false);
                        setIsAgencyConnected(false);
                        setIsOrganizationConnected(false);
                        setUserData(null);
                    }
                })
                .catch(() => {
                    setIsCustomerAuthenticated(false);
                    setIsAgencyConnected(false);
                    setIsOrganizationConnected(false);
                    setUserData(null);
                });
        }

    }

    useEffect(() => {
        const token = localStorage.getItem(tokenKeyName) as string;
        if (token !== "" && token !== undefined)
        {
            getCurrentUser();
        }
    }, []);



    const authMethods = useMemo(() => ({
        login,
        isLoading,
        userData,
        axiosErrors,
        register,
        handleSubmit,
        errors,
        isCustomerAuthenticated,
        logout,
        isAgencyConnected,
        isOrganizationConnected,


    }), [isLoading, userData, axiosErrors, register, handleSubmit, errors, isCustomerAuthenticated, isAgencyConnected, isOrganizationConnected]);

    return { authMethods };

}