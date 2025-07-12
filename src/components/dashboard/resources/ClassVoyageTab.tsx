// src/components/dashboard/resources/ClassVoyageTab.tsx
import React from 'react';
import { Plus, Edit, Trash2, Tag, AlertCircle } from 'lucide-react';
import { useClassVoyageTab } from '@/lib/hooks/dasboard/useClassVoyageTab';
import AddClassVoyageModal from './AddClassVoyageModal';
import Loader from '@/modals/Loader';
import TransparentModal from '@/modals/TransparentModal';

const ClassVoyageTab = () => {
    const hook = useClassVoyageTab();

    if (hook.isLoading) return <div className="flex justify-center p-10"><Loader /></div>;
    if (hook.apiError && !hook.isModalOpen) return <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg"><AlertCircle className="mx-auto h-8 w-8 mb-2" />{hook.apiError}</div>;

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={hook.openModalForCreate} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white">
                    <Plus className="h-4 w-4" /> Ajouter une classe
                </button>
            </div>
            <TransparentModal isOpen={hook.isModalOpen}><AddClassVoyageModal hook={hook} /></TransparentModal>

            {hook.classes.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <Tag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold">Aucune classe de voyage</h3>
                    <p className="mt-1 text-sm text-gray-500">Créez votre première classe de voyage (ex: VIP, Classique).</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border">
                    {/* ... Table pour afficher les classes ... */}
                </div>
            )}
        </div>
    );
};
export default ClassVoyageTab;