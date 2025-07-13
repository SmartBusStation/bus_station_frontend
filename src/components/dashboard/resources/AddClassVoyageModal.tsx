import React from 'react';
import { X } from 'lucide-react';
import { useClassVoyageTab } from '@/lib/hooks/dasboard/useClassVoyageTab';
import InputField from '@/ui/InputField';

interface AddClassVoyageModalProps { hook: ReturnType<typeof useClassVoyageTab> }

const AddClassVoyageModal: React.FC<AddClassVoyageModalProps> = ({ hook }) => {
    const { form, onSubmit, isSubmitting, apiError, editingClass, closeModal } = hook;
    const { register, handleSubmit, formState: { errors } } = form;
    const isEditMode = !!editingClass;

    return (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">{isEditMode ? "Modifier la Classe de Voyage" : "Ajouter une Classe de Voyage"}</h2>
                <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200"><X className="h-5 w-5"/></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 space-y-4">
                    {apiError && <p className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{apiError}</p>}
                    <InputField id="nom" label="Nom de la classe" placeholder="Ex: VIP Climatisé" register={register("nom")} error={errors.nom?.message} />
                    <InputField id="prix" type="number" label="Prix de base (FCFA)" placeholder="Ex: 8000" register={register("prix")} error={errors.prix?.message} />
                    <InputField id="tauxAnnulation" type="number" label="Taux d'annulation (%)" placeholder="Ex: 10" register={register("tauxAnnulation")} error={errors.tauxAnnulation?.message} />
                </div>
                <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                    <button type="button" onClick={closeModal} className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100">Annuler</button>
                    <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-primary/50">
                        {isSubmitting ? 'Sauvegarde...' : (isEditMode ? 'Mettre à jour' : 'Créer la classe')}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddClassVoyageModal;