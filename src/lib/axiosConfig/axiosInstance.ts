import axios, {AxiosInstance} from "axios";
import authInterceptor from "./interceptors/auth-interceptor";
import errorInterceptor from "./interceptors/error-interceptor";



const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL
});

authInterceptor(axiosInstance);
errorInterceptor(axiosInstance);

export default axiosInstance;
