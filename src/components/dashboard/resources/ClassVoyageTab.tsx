"use client"
import { Plus, Edit, Trash2, Tag, AlertCircle, Search } from "lucide-react"
import { useClassVoyageTab } from "@/lib/hooks/dasboard/useClassVoyageTab"
import AddClassVoyageModal from "./AddClassVoyageModal"
import Loader from "@/modals/Loader"
import TransparentModal from "@/modals/TransparentModal"
import { useState, useMemo } from "react"

const ClassVoyageTab = () => {
    const hook = useClassVoyageTab()

    // État pour la recherche
    const [searchTerm, setSearchTerm] = useState("")

    // Filtrage des classes basé sur la recherche
    const filteredClasses = useMemo(() => {
        if (!searchTerm) return hook.classes

        return hook.classes.filter((classe) =>
            classe.nom?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [hook.classes, searchTerm])

    // Fonction pour obtenir le badge de prix
    const getPriceBadge = (prix: number) => {
        if (prix <= 5000) {
            return { color: "bg-green-100 text-green-800", label: "Budget", icon: "💰" }
        } else if (prix <= 15000) {
            return { color: "bg-blue-100 text-blue-800", label: "Standard", icon: "🎯" }
        } else {
            return { color: "bg-purple-100 text-purple-800", label: "Premium", icon: "⭐" }
        }
    }

    // Fonction pour obtenir le badge de taux d'annulation
    const getCancellationBadge = (taux: number) => {
        if (taux <= 5) {
            return { color: "bg-green-100 text-green-800", label: "Faible" }
        } else if (taux <= 15) {
            return { color: "bg-orange-100 text-orange-800", label: "Moyen" }
        } else {
            return { color: "bg-red-100 text-red-800", label: "Élevé" }
        }
    }

    // Fonction pour obtenir la couleur d'icône de classe
    const getClassColor = (nom: string) => {
        const colors = [
            "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500",
            "bg-indigo-500", "bg-yellow-500", "bg-red-500", "bg-teal-500"
        ]
        const charCode = nom.charCodeAt(0) || 0
        return colors[charCode % colors.length]
    }

    if (hook.isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader />
            </div>
        )
    }

    if (hook.apiError && !hook.isModalOpen) {
        return (
            <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Erreur de chargement</h3>
                <p className="text-gray-600 mb-4">{hook.apiError}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Réessayer
                </button>
            </div>
        )
    }

    return (
        <div className="p-8">
            {/* Header avec recherche */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Classes de Voyage</h3>
                        <p className="text-gray-600">Gérez les différentes classes et niveaux de service</p>
                    </div>
                    <button
                        onClick={hook.openModalForCreate}
                        className="flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        <Plus className="h-5 w-5" />
                        Nouvelle Classe
                    </button>
                </div>

                {/* Barre de recherche */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher une classe..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                </div>

                {/* Indicateur de résultats */}
                {searchTerm && (
                    <p className="mt-3 text-sm text-gray-600">
                        {filteredClasses.length} résultat(s) pour "{searchTerm}"
                    </p>
                )}
            </div>

            <TransparentModal isOpen={hook.isModalOpen}>
                <AddClassVoyageModal hook={hook} />
            </TransparentModal>

            {/* Contenu principal */}
            {filteredClasses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                        <Tag className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {searchTerm ? "Aucune classe trouvée" : "Aucune classe de voyage définie"}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                        {searchTerm
                            ? "Essayez de modifier votre recherche"
                            : "Créez des classes pour offrir différents niveaux de service à vos clients."
                        }
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={hook.openModalForCreate}
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="h-5 w-5" />
                            Créer une classe
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-blue-50">
                        <tr>
                            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">
                                Classe
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">
                                Prix de Base
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">
                                Catégorie
                            </th>
                            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">
                                Taux d'Annulation
                            </th>
                            <th className="px-8 py-5 text-center text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {filteredClasses.map((cls, index) => {
                            const priceBadge = getPriceBadge(cls.prix || 0)
                            const cancellationBadge = getCancellationBadge(cls.tauxAnnulation || 0)
                            const classColor = getClassColor(cls.nom || '')

                            return (
                                <tr key={cls.idClassVoyage} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-blue-50/50 transition-colors`}>
                                    {/* Classe */}
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-lg ${classColor} flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                                                {priceBadge.icon}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-base">{cls.nom}</div>
                                                <div className="text-gray-600 text-sm flex items-center gap-1">
                                                    <Tag className="h-3 w-3" />
                                                    Classe de voyage
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Prix */}
                                    <td className="px-8 py-6">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {cls.prix?.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500">FCFA</div>
                                    </td>

                                    {/* Catégorie */}
                                    <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${priceBadge.color}`}>
                                                <span className="mr-1">{priceBadge.icon}</span>
                                                {priceBadge.label}
                                            </span>
                                    </td>

                                    {/* Taux d'annulation */}
                                    <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${cancellationBadge.color}`}>
                                                {cls.tauxAnnulation}% - {cancellationBadge.label}
                                            </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => hook.openModalForEdit(cls)}
                                                className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                title="Modifier"
                                            >
                                                <Edit className="h-6 w-6" />
                                            </button>
                                            <button
                                                onClick={() => hook.handleDelete(cls.idClassVoyage!)}
                                                className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ClassVoyageTab