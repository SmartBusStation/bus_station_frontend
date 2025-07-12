import axios, {AxiosInstance} from "axios";
import authInterceptor from "./interceptors/auth-interceptor";




const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TRIP_AGENCY_BACKEND_API_URL,
    timeout: 60000,
}, );

authInterceptor(axiosInstance);
//errorInterceptor(axiosInstance);

export default axiosInstance;
