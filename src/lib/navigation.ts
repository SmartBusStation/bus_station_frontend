"use client";


import {useRouter} from "next/navigation";

export function useNavigation()
{

    const router = useRouter();

    function onGoToGoLogin()
    {
        router.push("/login");
    }
    function onGoToRegister()
    {
        router.push("/register")
    }

    return {
        onGoToGoLogin,
        onGoToRegister,
    }
}

