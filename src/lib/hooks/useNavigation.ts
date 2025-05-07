import { useRouter } from "next/navigation";




export function useNavigation() {

    const router = useRouter();
    function navigate (route: string): void
    {
        router.push(route);
    }

    return {
        onGoToLogin: () => navigate("/login"),
        onGoToRegister: () => navigate("/register"),
        goToHome: () => navigate("/"),
        onGoToContactUs: () => navigate("/contact-us"),
        onGoToMarketPlace: ()=> navigate("/market-place"),
    };
}
