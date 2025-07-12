// src/components/dashboard/resources/EmployeesTab.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2, Users, AlertCircle } from "lucide-react";
import { useEmployeesTab } from "@/lib/hooks/dasboard/useEmployeesTab";
import AddEmployeeModal from "./AddEmployeeModal";
import Loader from "@/modals/Loader";

const EmployeesTab = () => {
    const { t } = useTranslation();
    const hook = useEmployeesTab();

    if (hook.isLoading) {
        return <div className="flex justify-center p-10"><Loader /></div>;
    }

    if (hook.apiError && !hook.isModalOpen) {
        return (
            <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
                <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                {hook.apiError}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={hook.openModalForCreate} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    {t("dashboard.resources.addEmployee")}
                </button>
            </div>

            <AddEmployeeModal hook={hook} />

            {hook.employees.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun employé trouvé</h3>
                    <p className="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier employé.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Nom Complet</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Poste</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Statut</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {hook.employees.map((employee) => (
                            <tr key={employee.employeId}>
                                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{employee.firstName} {employee.lastName}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-gray-600">{employee.email}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-gray-600">{employee.poste}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-gray-600 capitalize">{employee.statutEmploye &&employee.statutEmploye.toLowerCase()}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-right space-x-2">
                                    <button onClick={() => hook.openModalForEdit(employee)} className="text-gray-500 hover:text-primary"><Edit className="h-4 w-4" /></button>
                                    <button onClick={() => employee.employeId && hook.handleDelete(employee.employeId)} className="text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeesTab;