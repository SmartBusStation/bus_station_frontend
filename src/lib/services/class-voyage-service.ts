// src/lib/services/class-voyage-service.ts
import { AxiosResponse } from "axios";
import axiosInstance from "./axios-services/axiosInstance";
import { ClassVoyage, ClassVoyageDTO } from "../types/generated-api";
import { PaginatedResponse } from "../types/common";

const url = "/class-voyage";

export async function getAllClassesByAgency(agencyId: string, page = 0, size = 50): Promise<ClassVoyage[]> {
    if (!agencyId) throw new Error("Agency ID is required");
    try {
        const response: AxiosResponse<PaginatedResponse<ClassVoyage>> = await axiosInstance.get(url, {
            params: { page, size }
        });
        console.log(response.data);
        return response.data.content;

       // return response.data.content.filter(cls => cls.idAgenceVoyage === agencyId);
    } catch (error) {
        console.error("[class-voyage-service] Erreur de récupération des classes:", error);
        throw error;
    }
}

export async function createClassVoyage(data: ClassVoyageDTO): Promise<ClassVoyage> {
    try {
        const response: AxiosResponse<ClassVoyage> = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateClassVoyage(id: string, data: ClassVoyageDTO): Promise<ClassVoyage> {
    try {
        const response: AxiosResponse<ClassVoyage> = await axiosInstance.put(`${url}/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteClassVoyage(id: string): Promise<void> {
    try {
        await axiosInstance.delete(`${url}/${id}`);
    } catch (error) {
        throw error;
    }
}