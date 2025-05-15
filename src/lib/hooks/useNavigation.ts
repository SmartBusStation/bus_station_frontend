import { useRouter } from "next/navigation";




export function useNavigation() {

    const router = useRouter();


    function setStepOnLocaleStorage()
    {
        const step: number = Number(localStorage.getItem("registrationStep") as string);
        if(!step)
        {
            localStorage.setItem("registrationStep", String(1));
        }
    }

    function navigate (route: string): void
    {
        router.push(route);
    }


    return {
        onGoToLogin: () => navigate("/login"),
        onGoToRegister: () => {setStepOnLocaleStorage(); navigate("/register")},
        goToHome: () => navigate("/"),
        onGoToContactUs: () => navigate("/contact-us"),
        onGoToMarketPlace: ()=> navigate("/market-place"),
    };
}
