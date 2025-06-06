import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginSchemaType} from "@/lib/types/schema/loginSchema";


export function useLogin() {

    const {register, handleSubmit, formState: { errors }} = useForm<LoginSchemaType>(
        {
            resolver: zodResolver(loginSchema),
        });



    const onLogin = (data: LoginSchemaType) => {
        console.log(data);
    }


    return{
        register,
        handleSubmit,
        errors,
        onLogin
    }
}