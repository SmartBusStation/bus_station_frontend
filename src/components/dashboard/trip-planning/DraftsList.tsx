import React from "react";
import { Plus, Edit, Send } from "lucide-react";
import { useTripPlanner } from "@/lib/hooks/dasboard/useTripPlanner";

interface DraftsListProps {
    hook: ReturnType<typeof useTripPlanner>;
}

const DraftsList: React.FC<DraftsListProps> = ({ hook }) => {
    const { drafts, handleSelectDraft, handlePublishDraft, isSubmitting } = hook;

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Brouillons de Voyages</h3>

            <div className="flex-grow overflow-y-auto">
                {drafts.length > 0 ? (
                    <ul className="space-y-3">
                        {drafts.map((draft) => (
                            <li key={draft.idVoyage} className="flex items-center justify-between rounded-md p-3 hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="font-medium text-gray-800">{draft.titre}</p>
                                    <p className="text-xs text-gray-500">De {draft.lieuDepart} à {draft.lieuArrive}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => draft.idVoyage && handleSelectDraft(draft.idVoyage)} className="text-gray-500 hover:text-primary" title="Modifier"><Edit className="h-4 w-4" /></button>
                                    <button onClick={() =>draft.idVoyage &&  handlePublishDraft(draft.idVoyage)} disabled={isSubmitting} className="text-gray-500 hover:text-green-600" title="Publier"><Send className="h-4 w-4" /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 text-center py-4">Aucun brouillon en cours.</p>
                )}
            </div>

            <button onClick={() => handleSelectDraft(null)} className="mt-4 w-full flex items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                <Plus className="h-4 w-4" /> Créer un nouveau voyage
            </button>
        </div>
    );
};

export default DraftsList;