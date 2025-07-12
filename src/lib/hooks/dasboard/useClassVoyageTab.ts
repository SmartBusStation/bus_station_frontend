// src/lib/hooks/dasboard/useClassVoyageTab.ts
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusStation } from "@/context/Provider";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { ClassVoyage, ClassVoyageDTO } from "@/lib/types/generated-api";
import { ClassVoyageFormType, classVoyageSchema } from "@/lib/types/schema/classVoyageSchema";
import { getAllClassesByAgency, createClassVoyage, updateClassVoyage, deleteClassVoyage } from "@/lib/services/class-voyage-service";

export function useClassVoyageTab() {
    const { userData } = useBusStation();
    const [classes, setClasses] = useState<ClassVoyage[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [editingClass, setEditingClass] = useState<ClassVoyage | null>(null);

    const form = useForm<ClassVoyageFormType>({ resolver: zodResolver(classVoyageSchema) });

    const fetchClasses = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const data = await getAllClassesByAgency(id);
            setClasses(data || []);
        } catch (e) { setApiError("Impossible de charger les classes de voyage."); }
        finally { setIsLoading(false); }
    }, []);

    useEffect(() => {
        if (userData?.userId) {
            getAgencyByChefId(userData.userId).then(agency => {
                if (agency?.agencyId) {
                    setAgencyId(agency.agencyId);
                    fetchClasses(agency.agencyId);
                } else {
                    setIsLoading(false);
                    setApiError("Agence non trouvée.");
                }
            });
        }
    }, [userData, fetchClasses]);

    const openModalForCreate = () => {
        setEditingClass(null);
        form.reset();
        setIsModalOpen(true);
    };

    const openModalForEdit = (cls: ClassVoyage) => {
        setEditingClass(cls);
        form.reset(cls);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const onSubmit = async (data: ClassVoyageFormType) => {
        if (!agencyId) return;
        setIsSubmitting(true);
        setApiError(null);
        const payload: ClassVoyageDTO = { ...data, idAgenceVoyage: agencyId };
        try {
            if (editingClass?.idClassVoyage) {
                await updateClassVoyage(editingClass.idClassVoyage, payload);
            } else {
                await createClassVoyage(payload);
            }
            await fetchClasses(agencyId);
            closeModal();
        } catch (e: any) {
            setApiError(e.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette classe ?")) {
            try {
                await deleteClassVoyage(id);
                if (agencyId) await fetchClasses(agencyId);
            } catch (e: any) {
                setApiError(e.response?.data?.message || "Erreur de suppression.");
            }
        }
    };

    return { classes, isLoading, isSubmitting, isModalOpen, apiError, editingClass, form, openModalForCreate, openModalForEdit, closeModal, onSubmit, handleDelete };
}