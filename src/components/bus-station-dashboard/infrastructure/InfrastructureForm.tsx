// src/components/bus-station-dashboard/infrastructure/InfrastructureForm.tsx
import React, { useState, useEffect } from "react";
import { BusStation } from "@/lib/types/bus-station";
import { MapPin, Info, Clock, Bus, Globe, Save } from "lucide-react";

interface InfrastructureFormProps {
  station: BusStation;
  onSave?: (updatedStation: BusStation) => void;
}

// Fonction utilitaire pour éviter les valeurs nulles
const nullSafe = (value: any, defaultValue: any = '') => value ?? defaultValue;

const InfrastructureForm: React.FC<InfrastructureFormProps> = ({
  station,
  onSave,
}) => {
  // Initialisation sécurisée pour éviter les 'null'
  const [formData, setFormData] = useState({
    nomGareRoutiere: nullSafe(station.nomGareRoutiere),
    ville: nullSafe(station.ville),
    quartier: nullSafe(station.quartier),
    description: nullSafe(station.description),
    photoUrl: nullSafe(station.photoUrl),
    services: nullSafe(station.services, []),
    horaires: nullSafe(station.horaires, "24h/7j"),
    localisation: {
      latitude: nullSafe(station.localisation?.latitude, 0),
      longitude: nullSafe(station.localisation?.longitude, 0),
    },
    // Le backend n'envoie pas ces champs, on les simule si besoin
    estOuvert: station.estOuvert ?? true,
  });

  // Mettre à jour si la prop `station` change
  useEffect(() => {
    setFormData({
      nomGareRoutiere: nullSafe(station.nomGareRoutiere),
      ville: nullSafe(station.ville),
      quartier: nullSafe(station.quartier),
      description: nullSafe(station.description),
      photoUrl: nullSafe(station.photoUrl),
      services: nullSafe(station.services, []),
      horaires: nullSafe(station.horaires, "24h/7j"),
      localisation: {
        latitude: nullSafe(station.localisation?.latitude, 0),
        longitude: nullSafe(station.localisation?.longitude, 0),
      },
      estOuvert: station.estOuvert ?? true,
    });
  }, [station]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    const checked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData(prev => ({ ...prev, services: e.target.value.split(',').map(s => s.trim()) }))
  }

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    coord: "latitude" | "longitude"
  ) => {
    setFormData((prev) => ({
      ...prev,
      localisation: {
        ...prev.localisation,
        [coord]: parseFloat(e.target.value) || 0,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData as any);
    }
    console.log("Données à envoyer au backend :", formData);
    alert("Données de la gare sauvegardées ! (Simulation)");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Nom, Ville, Quartier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nomGareRoutiere" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la Gare
            </label>
            <input type="text" name="nomGareRoutiere" id="nomGareRoutiere" value={formData.nomGareRoutiere} onChange={handleChange} className="form-input" />
          </div>
          <div>
            <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
            <input type="text" name="ville" id="ville" value={formData.ville} onChange={handleChange} className="form-input" />
          </div>
        </div>

        <div>
            <label htmlFor="quartier" className="block text-sm font-medium text-gray-700 mb-1">Quartier / Adresse</label>
            <input type="text" name="quartier" id="quartier" value={formData.quartier} onChange={handleChange} className="form-input" />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} className="form-textarea"></textarea>
        </div>

        {/* URL Image */}
        <div>
          <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">URL de la photo de couverture</label>
          <input type="text" name="photoUrl" id="photoUrl" value={formData.photoUrl} onChange={handleChange} className="form-input" />
        </div>

        {/* Services & Horaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="services" className="block text-sm font-medium text-gray-700 mb-1">Services (séparés par des virgules)</label>
              <input type="text" name="services" id="services" value={formData.services.join(", ")} onChange={handleServicesChange} className="form-input" />
            </div>
            <div>
              <label htmlFor="horaires" className="block text-sm font-medium text-gray-700 mb-1">Horaires d'ouverture</label>
              <input type="text" name="horaires" id="horaires" value={formData.horaires} onChange={handleChange} className="form-input" />
            </div>
        </div>

        {/* Coordonnées GPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input type="number" name="latitude" id="latitude" step="any" value={formData.localisation.latitude} onChange={(e) => handleLocationChange(e, "latitude")} className="form-input" />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input type="number" name="longitude" id="longitude" step="any" value={formData.localisation.longitude} onChange={(e) => handleLocationChange(e, "longitude")} className="form-input" />
          </div>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="pt-5 flex justify-end">
          <button type="submit" className="inline-flex items-center justify-center gap-2 py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Save className="h-4 w-4" />
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfrastructureForm;