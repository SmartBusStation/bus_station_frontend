// src/components/dashboard/resources/AddClassVoyageModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { useClassVoyageTab } from '@/lib/hooks/dasboard/useClassVoyageTab';
import InputField from '@/ui/InputField';
import TransparentModal from '@/modals/TransparentModal';

interface AddClassVoyageModalProps { hook: ReturnType<typeof useClassVoyageTab> }

const AddClassVoyageModal: React.FC<AddClassVoyageModalProps> = ({ hook }) => {
    const { form, onSubmit, isSubmitting, apiError, editingClass, closeModal } = hook;
    const { register, handleSubmit, formState: { errors } } = form;
    const isEditMode = !!editingClass;

    return (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">{isEditMode ? "Modifier la Classe" : "Ajouter une Classe"}</h2>
                <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200"><X className="h-5 w-5"/></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 space-y-4">
                    {apiError && <p className="text-red-500">{apiError}</p>}
                    <InputField id="nom" label="Nom de la classe" register={register("nom")} error={errors.nom?.message} />
                    <InputField id="prix" type="number" label="Prix de base (FCFA)" register={register("prix")} error={errors.prix?.message} />
                    <InputField id="tauxAnnulation" type="number" label="Taux d'annulation (%)" register={register("tauxAnnulation")} error={errors.tauxAnnulation?.message} />
                </div>
                <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                    <button type="button" onClick={closeModal} className="px-4 py-2 bg-white border rounded-md">Annuler</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-primary/50">
                        {isSubmitting ? 'Sauvegarde...' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddClassVoyageModal;