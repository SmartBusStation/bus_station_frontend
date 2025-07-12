// src/app/(agency-views)/dashboard/drafts/page.tsx
"use client";

import React from "react";
import { Edit, Send, Trash2, FileEdit, AlertCircle, RefreshCw } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { useDraftsPage } from "@/lib/hooks/dasboard/useDraftsPage";
import Loader from "@/modals/Loader";
import { formatDateOnly } from "@/lib/services/date-services";

const DraftsPage = () => {
    const hook = useDraftsPage();

    if (hook.isLoading) {
        return <div className="flex justify-center p-20"><Loader /></div>;
    }

    if (hook.apiError) {
        return (
            <div className="p-10 text-center text-red-600 bg-red-50 rounded-lg">
                <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
                <h3 className="mt-2 text-lg font-semibold">Erreur de chargement</h3>
                <p className="mt-1 text-sm">{hook.apiError}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2 mx-auto">
                    <RefreshCw className="h-4 w-4" /> Réessayer
                </button>
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title="Brouillons de Voyages"
                subtitle="Gérez, modifiez et publiez vos voyages en attente."
            />

            {hook.drafts.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <FileEdit className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun brouillon</h3>
                    <p className="mt-1 text-sm text-gray-500">Vous n'avez aucun voyage en cours de planification.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Titre</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Trajet</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Date de départ</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {hook.drafts.map(draft => (
                            <tr key={draft.idVoyage}>
                                <td className="px-4 py-3 font-medium">{draft.titre}</td>
                                <td className="px-4 py-3">{draft.lieuDepart} → {draft.lieuArrive}</td>
                                <td className="px-4 py-3">{formatDateOnly(draft.dateDepartPrev || '')}</td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <button onClick={() => hook.handleEdit(draft.idVoyage!)} className="p-1.5 text-gray-500 hover:text-primary rounded-md"><Edit className="h-4 w-4"/></button>
                                    <button onClick={() => hook.handlePublish(draft.idVoyage!)} className="p-1.5 text-gray-500 hover:text-green-600 rounded-md"><Send className="h-4 w-4"/></button>
                                    <button onClick={() => hook.handleDelete(draft.idVoyage!)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-md"><Trash2 className="h-4 w-4"/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default DraftsPage;