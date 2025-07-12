// src/lib/hooks/dasboard/useEmployeesTab.ts
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeFormType, employeeFormSchema } from "@/lib/types/schema/employeeSchema";
import { getEmployeesByAgency, createEmployeeForAgency, updateEmployee, deleteEmployee } from "@/lib/services/employe-service";
import { getAgencyByChefId } from "@/lib/services/agency-service";
import { useBusStation } from "@/context/Provider";
import {  EmployeRequestDTO, EmployeResponseDTO } from "@/lib/types/generated-api";

export function useEmployeesTab() {
    const { userData, isLoading: isUserLoading } = useBusStation();

    // Le backend retourne un type spécifique pour la liste, utilisons-le si possible. Sinon UserResponseCreatedDTO est un bon fallback.
    const [employees, setEmployees] = useState<EmployeResponseDTO[]>([]);
    const [agencyId, setAgencyId] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const [editingEmployee, setEditingEmployee] = useState<EmployeResponseDTO | null>(null);

    const form = useForm<EmployeeFormType>({
        resolver: zodResolver(employeeFormSchema),
    });

    const fetchEmployees = useCallback(async (id: string) => {
        setIsLoading(true);
        setApiError(null);
        try {
            // NOTE: Le swagger indique que `/utilisateur/employes/{agenceId}` renvoie `EmployeResponseDTO[]`
            const data = await getEmployeesByAgency(id) as unknown as EmployeResponseDTO[];
            setEmployees(data || []);
        } catch (error) {
            setApiError("Impossible de charger la liste des employés.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const initialize = async () => {
            if (isUserLoading || !userData?.userId) return;
            try {
                const agency = await getAgencyByChefId(userData.userId);
                if (agency?.agencyId) {
                    setAgencyId(agency.agencyId);
                    await fetchEmployees(agency.agencyId);
                } else {
                    setApiError("Aucune agence n'est associée à votre compte.");
                    setIsLoading(false);
                }
            } catch (error) {
                setApiError("Erreur de récupération de votre agence.");
                setIsLoading(false);
            }
        };
        initialize();
    }, [userData, isUserLoading, fetchEmployees]);

    const openModalForCreate = () => {
        setEditingEmployee(null);
        form.reset({ password: '', confirmPassword: '' });
        setApiError(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (employee: EmployeResponseDTO) => {
        setEditingEmployee(employee);
        form.reset({
            first_name: employee.firstName,
            last_name: employee.lastName,
            username: employee.username,
            email: employee.email,
            phone_number: employee.phoneNumber,
            poste: employee.poste,
            departement: employee.departement,
            // Le salaire n'est pas dans EmployeResponseDTO, on le laisse vide pour l'édition
            // gender est aussi manquant dans la réponse, attention à la cohérence API
            password: '',
            confirmPassword: ''
        });
        setApiError(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEmployee(null);
    };

    const onSubmit = async (data: EmployeeFormType) => {
        if (!agencyId) {
            setApiError("ID de l'agence introuvable.");
            return;
        }
        setIsSubmitting(true);
        setApiError(null);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...baseData } = data;
        const payload: EmployeRequestDTO = {
            ...baseData,
            role: ["EMPLOYE"],
            agenceVoyageId: agencyId,
            userExist: !!editingEmployee
        };


        try {
            if (editingEmployee && editingEmployee.employeId) {
                await updateEmployee(editingEmployee.employeId, payload);
            } else {
                await createEmployeeForAgency(payload);
            }
            await fetchEmployees(agencyId);
            closeModal();
        } catch (error: any) {
            setApiError(error.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (employeeId: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
            return;
        }
        setApiError(null);
        try {
            await deleteEmployee(employeeId);
            setEmployees(prev => prev.filter(e => e.employeId !== employeeId));
        } catch (error: any) {
            setApiError(error.response?.data?.message || "Erreur lors de la suppression.");
        }
    };

    return {
        employees,
        isLoading,
        isSubmitting,
        isModalOpen,
        apiError,
        form,
        editingEmployee,
        openModalForCreate,
        openModalForEdit,
        closeModal,
        onSubmit,
        handleDelete
    };
}