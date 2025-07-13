import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusStation } from "@/context/Provider";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { ClassVoyage, ClassVoyageDTO } from "@/lib/types/generated-api";
import { ClassVoyageFormType, classVoyageSchema } from "@/lib/types/schema/classVoyageSchema";
import { getAllClasses, createClassVoyage, updateClassVoyage, deleteClassVoyage } from "@/lib/services/class-voyage-service";

export function useClassVoyageTab() {
    const { userData, isLoading: isUserLoading } = useBusStation();
    const [classes, setClasses] = useState<ClassVoyage[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [editingClass, setEditingClass] = useState<ClassVoyage | null>(null);

    const form = useForm<ClassVoyageFormType>({ resolver: zodResolver(classVoyageSchema) });

    const fetchAndFilterClasses = useCallback(async (currentAgencyId: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response = await getAllClasses();
            const agencyClasses = response.content.filter(cls => cls.idAgenceVoyage === currentAgencyId);
            setClasses(agencyClasses);
        } catch (e) {
            setApiError("Impossible de charger les classes de voyage.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isUserLoading || !userData?.userId) return;

        getAgencyByChefId(userData.userId).then(agency => {
            if (agency?.agencyId) {
                setAgencyId(agency.agencyId);
                fetchAndFilterClasses(agency.agencyId);
            } else {
                setApiError("Agence non trouvée.");
                setIsLoading(false);
            }
        }).catch(() => {
            setApiError("Erreur de récupération de l'agence.");
            setIsLoading(false);
        });

    }, [userData, isUserLoading, fetchAndFilterClasses]);

    const openModalForCreate = () => {
        setEditingClass(null);
        form.reset({ nom: '', prix: 0, tauxAnnulation: 0 });
        setApiError(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (cls: ClassVoyage) => {
        setEditingClass(cls);
        form.reset({
            nom: cls.nom,
            prix: cls.prix,
            tauxAnnulation: cls.tauxAnnulation,
        });
        setApiError(null);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const onSubmit = async (data: ClassVoyageFormType) => {
        if (!agencyId) {
            setApiError("ID de l'agence introuvable.");
            return;
        }
        setIsSubmitting(true);
        setApiError(null);
        const payload: ClassVoyageDTO = { ...data, idAgenceVoyage: agencyId };

        try {
            if (editingClass?.idClassVoyage) {
                await updateClassVoyage(editingClass.idClassVoyage, payload);
            } else {
                await createClassVoyage(payload);
            }
            await fetchAndFilterClasses(agencyId);
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
                setClasses(prev => prev.filter(c => c.idClassVoyage !== id));
            } catch (e: any) {
                setApiError(e.response?.data?.message || "Erreur de suppression.");
            }
        }
    };

    return { classes, isLoading, isSubmitting, isModalOpen, apiError, editingClass, form, openModalForCreate, openModalForEdit, closeModal, onSubmit, handleDelete };
}