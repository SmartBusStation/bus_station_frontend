import { AxiosResponse } from "axios";
import axios from "axios";
import {
  BusinessActor,
  Customer,
  LoginResponseDTO,
} from "@/lib/types/models/BusinessActor";
import { BusinessActorFormType } from "@/lib/types/schema/businessActorSchema";
import { LoginSchemaType } from "@/lib/types/schema/loginSchema";
import axiosInstance from "@/lib/services/axios-services/axiosInstance";


function stripConfirmPassword(data: BusinessActorFormType) {
  const { confirmPassword, ...rest } = data;
  return { confirmPassword, rest };
}

export async function createBusinessActor(
  data: BusinessActorFormType
): Promise<BusinessActor | null> {
  try {
    const dataToSend = stripConfirmPassword(data);
    const apiResponse: AxiosResponse<BusinessActor> = await axiosInstance.post(
      "/utilisateur/inscription", // Use axiosInstance with relative path
      dataToSend.rest
    );
    if (apiResponse.status === 201 || apiResponse.status === 200) {
      console.log(apiResponse.data);
      return apiResponse.data;
    } else {
      console.warn("Code HTTP innatendu", apiResponse.status);
      return null;
    }
  } catch (error) {
    console.error("Error when creating the business actor ", error);
    throw error;
  }
}

export async function loginBusinessActor(
  data: LoginSchemaType
): Promise<LoginResponseDTO | null> {
  try {
    const apiResponse: AxiosResponse<LoginResponseDTO> = await axiosInstance.post(
      "/utilisateur/connexion", // Use axiosInstance with relative path
      data
    );
    if (apiResponse.status === 200) {
      console.log(apiResponse.data);
      return apiResponse.data;
    } else {
      console.warn("Unattended http code", apiResponse.status);
      return null;
    }
  } catch (error) {
    console.error("error during login process ", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("Backend error response:", error.response.data);
      console.error("Backend error status:", error.response.status);
      throw new Error(error.response.data.message || `Error during login: ${error.response.status}`);
    }
    throw new Error("Error during login processs");
  }
}

export async function getConnectedUser(
  token: string
): Promise<Customer | null> {
  if (token && token !== "") {
    try {
      const apiResponse: AxiosResponse<Customer> = await axiosInstance.get(
        "/utilisateur/profil"
      );
      if (apiResponse.status === 200) {
        console.log(apiResponse);
        return apiResponse.data;
      } else {
        console.warn("Unattended http code", apiResponse.status);
        return null;
      }
    } catch (error) {
      console.error(
        "Something went wrong when getting the current user",
        error
      );
      throw new Error("Something went wrong when getting the current user");
    }
  }
  return null;
}