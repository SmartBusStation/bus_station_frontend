import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusStation } from "@/context/Provider";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { ClassVoyage, ClassVoyageDTO } from "@/lib/types/generated-api";
import { ClassVoyageFormType, classVoyageSchema } from "@/lib/types/schema/classVoyageSchema";
import { getAllClasses, createClassVoyage, updateClassVoyage, deleteClassVoyage } from "@/lib/services/class-voyage-service";
import { AxiosError } from "axios";

export function useClassVoyageTab() {
    const { userData, isLoading: isUserLoading } = useBusStation();
    const [classes, setClasses] = useState<ClassVoyage[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [editingClass, setEditingClass] = useState<ClassVoyage | null>(null);

    // États pour la modal de confirmation (comme EmployeesTab)
    const [canOpenConfirmationModal, setCanOpenConfirmationModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [classToDelete, setClassToDelete] = useState<ClassVoyage | null>(null);

    const form = useForm<ClassVoyageFormType>({ resolver: zodResolver(classVoyageSchema) });

    const fetchAndFilterClasses = useCallback(async (currentAgencyId: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response = await getAllClasses();
            const agencyClasses = response.content.filter(cls => cls.idAgenceVoyage === currentAgencyId);
            setClasses(agencyClasses);
<<<<<<< HEAD
        } catch (_e) { // Utilisation de _e pour indiquer que la variable n'est pas utilisée
=======
        } catch (e) {
            console.error(e);
>>>>>>> 9e1f18f30b7aa9e0aab7eb17d8269cd9d41102a5
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

    function openModalForCreate(): void {
        setEditingClass(null);
        form.reset({ nom: '', prix: 0, tauxAnnulation: 0 });
        setApiError(null);
        setIsModalOpen(true);
    }

    function openModalForEdit(cls: ClassVoyage): void {
        setEditingClass(cls);
        form.reset({
            nom: cls.nom,
            prix: cls.prix,
            tauxAnnulation: cls.tauxAnnulation,
        });
        setApiError(null);
        setIsModalOpen(true);
    }

    function closeModal(): void {
        setIsModalOpen(false);
        setEditingClass(null);
    }

    async function onSubmit(data: ClassVoyageFormType): Promise<void> {
        if (!agencyId) {
            setApiError("ID de l'agence introuvable.");
            return;
        }
        setIsSubmitting(true);
        setApiError(null);
        const payload: ClassVoyageDTO = { ...data, idAgenceVoyage: agencyId };

        try {
            let updatedClass: ClassVoyage;
            if (editingClass?.idClassVoyage) {
                updatedClass = await updateClassVoyage(editingClass.idClassVoyage, payload);
                setClasses(prev => prev.map(c => c.idClassVoyage === updatedClass.idClassVoyage ? updatedClass : c));
            } else {
                updatedClass = await createClassVoyage(payload);
                setClasses(prev => [...prev, updatedClass]);
            }
            closeModal();
<<<<<<< HEAD
        } catch (e) {
            const error = e as AxiosError<{ message: string }>;
            setApiError(error.response?.data?.message || "Une erreur est survenue.");
=======
        } catch (e: any) {
            console.error(e);
            setApiError(e.response?.data?.message || "Une erreur est survenue.");
>>>>>>> 9e1f18f30b7aa9e0aab7eb17d8269cd9d41102a5
        } finally {
            setIsSubmitting(false);
        }
    }

<<<<<<< HEAD
    const handleDelete = async (id: string) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette classe ?")) {
            try {
                await deleteClassVoyage(id);
                setClasses(prev => prev.filter(c => c.idClassVoyage !== id));
            } catch (e) {
                const error = e as AxiosError<{ message: string }>;
                setApiError(error.response?.data?.message || "Erreur de suppression.");
            }
=======
    // Fonction pour ouvrir la modal de confirmation (comme EmployeesTab)
    function openConfirmModal(classVoyage: ClassVoyage): void {
        if (classVoyage && classVoyage.idClassVoyage) {
            setConfirmationMessage(`Êtes-vous sûr de vouloir supprimer la classe "${classVoyage.nom}" ?`);
            setClassToDelete(classVoyage);
            setCanOpenConfirmationModal(true);
        } else {
            setConfirmationMessage("");
            setApiError("Une erreur est survenue, veuillez réessayer plus tard");
>>>>>>> 9e1f18f30b7aa9e0aab7eb17d8269cd9d41102a5
        }
    }

    // Fonction handleDelete modifiée (comme EmployeesTab)
    async function handleDelete(): Promise<void> {
        setIsLoading(true);
        setApiError(null);
        if (!classToDelete || !classToDelete.idClassVoyage) return;

        try {
            await deleteClassVoyage(classToDelete.idClassVoyage);
            setClasses(prev => prev.filter(c => c.idClassVoyage !== classToDelete.idClassVoyage));
            setCanOpenConfirmationModal(false);
        } catch (e: any) {
            console.error(e);
            setApiError("Erreur lors de la suppression, veuillez réessayer plus tard");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        classes,
        isLoading,
        isSubmitting,
        isModalOpen,
        apiError,
        editingClass,
        form,
        openModalForCreate,
        openModalForEdit,
        closeModal,
        onSubmit,
        handleDelete,
        canOpenConfirmationModal,
        setCanOpenConfirmationModal,
        confirmationMessage,
        openConfirmModal
    };
}