import axios, {AxiosInstance} from "axios";
import authInterceptor from "./interceptors/auth-interceptor";




const axiosInstance: AxiosInstance = axios.create({
        // Utilise l'URL de l'environnement ou une valeur par défaut pour le développement local.
    // Cela évite d'avoir à configurer le fichier .env pour que l'application fonctionne.
    baseURL: process.env.NEXT_PUBLIC_PROXY_URL_TRIP_AGENCY || "/trip-agency",
    timeout: 60000,
}, );

authInterceptor(axiosInstance);
//errorInterceptor(axiosInstance);

export default axiosInstance;
