// src/components/dashboard/resources/EmployeesTab.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Employee } from "@/lib/types/dashboard";

const EmployeesTab = () => {
  const { t } = useTranslation();

  const mockEmployees: Employee[] = [
    {
      id: "emp-01",
      name: "Sophie Leroy",
      role: "Manager",
      email: "sophie.l@moving.com",
      status: "active",
    },
    {
      id: "emp-02",
      name: "David Chen",
      role: "Support",
      email: "david.c@moving.com",
      status: "active",
    },
    {
      id: "emp-03",
      name: "Fatima Ndiaye",
      role: "Agent",
      email: "fatima.n@moving.com",
      status: "inactive",
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          {t("dashboard.resources.addEmployee")}
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nom
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Rôle
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Statut
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                  {employee.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.role}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap capitalize">
                  {employee.status}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right space-x-2">
                  <button className="text-gray-500 hover:text-primary">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTab;
