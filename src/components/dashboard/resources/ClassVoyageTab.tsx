import React from 'react';
import { Plus, Edit, Trash2, Tag, AlertCircle } from 'lucide-react';
import { useClassVoyageTab } from '@/lib/hooks/dasboard/useClassVoyageTab';
import AddClassVoyageModal from './AddClassVoyageModal';
import Loader from '@/modals/Loader';
import TransparentModal from '@/modals/TransparentModal';

const ClassVoyageTab = () => {
    const hook = useClassVoyageTab();

    if (hook.isLoading) {
        return <div className="flex justify-center p-10"><Loader /></div>;
    }

    if (hook.apiError && !hook.isModalOpen) {
        return <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg"><AlertCircle className="mx-auto h-8 w-8 mb-2" />{hook.apiError}</div>;
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={hook.openModalForCreate} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    <Plus className="h-4 w-4" /> Ajouter une classe
                </button>
            </div>

            <TransparentModal isOpen={hook.isModalOpen}>
                <AddClassVoyageModal hook={hook} />
            </TransparentModal>

            {hook.classes.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <Tag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune classe de voyage définie</h3>
                    <p className="mt-1 text-sm text-gray-500">Créez des classes pour les assigner à vos voyages.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Nom de la Classe</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Prix</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Taux d'Annulation</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {hook.classes.map((cls) => (
                            <tr key={cls.idClassVoyage}>
                                <td className="px-4 py-3 font-medium text-gray-900">{cls.nom}</td>
                                <td className="px-4 py-3 text-gray-700">{cls.prix?.toLocaleString()} FCFA</td>
                                <td className="px-4 py-3 text-gray-700">{cls.tauxAnnulation}%</td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <button onClick={() => hook.openModalForEdit(cls)} className="p-1.5 text-gray-500 hover:text-primary rounded-md"><Edit className="h-4 w-4" /></button>
                                    <button onClick={() => hook.handleDelete(cls.idClassVoyage!)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-md"><Trash2 className="h-4 w-4" /></button>
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
export default ClassVoyageTab;