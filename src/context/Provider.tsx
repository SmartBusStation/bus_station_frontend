import constate from 'constate';
import {useEffect, useMemo, useState} from "react";
import {loginSchema, LoginSchemaType} from "@/lib/types/schema/loginSchema";
import {User} from "@/lib/types/models/BusinessActor";
import {getConnectedUser, onLogin} from "@/lib/services/businessActorService";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";




export const [BusStationProvider, useBusStation] = constate(useBusStationProvider, value=> value.authMethods);


function useBusStationProvider() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<User|null>(null);
    const [axiosErrors, setAxiosErrors] = useState<string|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);



    /*** Zod variables for login Process ***/
    const {register, handleSubmit, formState: { errors }} = useForm<LoginSchemaType>(
        {
            resolver: zodResolver(loginSchema),
        });




    async function login(data: LoginSchemaType)
    {
        console.log(data);
        await onLogin(data)
            .then((result) => {
                if(result)
                {
                    setUserData(result);
                    if(result.role.includes("USAGER"))
                    {
                        window.location.href = "/market-place";
                    }
                    if (result.role.includes("ORGANISATION"))
                    {
                        window.location.href = "/dashboard";
                    }
                    if (result.role.includes("AGENCE_VOYAGE"))
                    {
                        window.location.href = "/dashboard";
                    }
                }
                else
                {
                    setAxiosErrors("Something went wrong, please try again !");
                }

            })
            .catch((error)=> {
                if(error.status === 401 || error.status === 403)
                {
                    setAxiosErrors("Wrong credentials, please try again !");
                }
                else if (error.status === 404)
                {
                    setAxiosErrors("User not found, please try again !");
                }
                else
                {
                    setAxiosErrors("Something went wrong, please try again !");
                }
            })
            .finally(()=> setIsLoading(false));
        setIsLoading(true);
    }



    async function getCurrentUser()
    {
        const token = localStorage.getItem("bus_station_token_key") as string;
        if(token === "")
        {
            setIsAuthenticated(false);
            setUserData(null);
        }
        else
        {
            await getConnectedUser(token)
                .then((result) => {
                    if(result)
                    {
                        setIsAuthenticated(true);
                        setUserData(result);
                    }
                    else
                    {
                        setIsAuthenticated(false);
                        setUserData(null);
                    }
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    setUserData(null);
                });
        }

    }

    useEffect(() => {
        getCurrentUser();
    }, []);



    const authMethods = useMemo(() => ({
        login,
        isLoading,
        userData,
        axiosErrors,
        register,
        handleSubmit,
        errors,
        isAuthenticated


    }), [isLoading, userData, axiosErrors, handleSubmit, register, errors, isAuthenticated ]);

    return { authMethods };

}