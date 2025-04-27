"use client";


import {useRouter} from "next/navigation";

export function useNavigation()
{

    const router = useRouter();

    function onGoToGoLogin():void
    {
        router.push("/login");
    }
    function onGoToRegister():void
    {
        router.push("/register")
    }

    function goToHome():void
    {
        router.push("/");
    }
    const onGoToContactUs = () => {
         router.push('/contact-us');
      };

    return {
        onGoToGoLogin,
        onGoToRegister,
        goToHome,
        onGoToContactUs,
    }
}

