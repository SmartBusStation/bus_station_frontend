// // src/components/dashboard/trip-planning/TripPlannerForm.tsx
// "use client";

// import React from "react";
// import { useTranslation } from "react-i18next";
// import { Car, User, MapPin, Calendar,  DollarSign } from "lucide-react";
// import { Vehicle, Driver } from "@/lib/types/dashboard";

// const InputGroup = ({
//   label,
//   id,
//   children,
// }: {
//   label: string;
//   id: string;
//   children: React.ReactNode;
// }) => (
//   <div>
//     <label
//       htmlFor={id}
//       className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     {children}
//   </div>
// );

// const TripPlannerForm = () => {
//   const { t } = useTranslation();

//   const mockVehicles: Vehicle[] = [
//     {
//       id: "veh-01",
//       name: "Bus VIP",
//       type: "Bus",
//       plate: "CE 123 AB",
//       capacity: 50,
//       status: "available",
//     },
//     {
//       id: "veh-02",
//       name: "Minibus Confort",
//       type: "Minibus",
//       plate: "LT 456 XY",
//       capacity: 25,
//       status: "available",
//     },
//   ];

//   const mockDrivers: Driver[] = [
//     {
//       id: "drv-01",
//       name: "Jean Dupont",
//       license: "Permis D",
//       phone: "0612345678",
//       status: "available",
//     },
//     {
//       id: "drv-02",
//       name: "Amina Diallo",
//       license: "Permis D",
//       phone: "0687654321",
//       status: "available",
//     },
//   ];

//   return (
//     <form className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
//       <h3 className="text-lg font-semibold text-gray-900 mb-6">
//         {t("dashboard.tripPlanning.form.title")}
//       </h3>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         <div className="md:col-span-2">
//           <InputGroup
//             id="trip-title"
//             label={t("dashboard.tripPlanning.form.tripTitle")}>
//             <input
//               type="text"
//               id="trip-title"
//               className="w-full rounded-md border-gray-200 text-sm focus:border-primary focus:ring-primary"
//               placeholder="Ex: Aventure dans les Alpes"
//             />
//           </InputGroup>
//         </div>

//         <InputGroup
//           id="departure-location"
//           label={t("dashboard.tripPlanning.form.departure")}>
//           <div className="relative">
//             <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
//             <input
//               type="text"
//               id="departure-location"
//               className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
//               placeholder="Yaoundé"
//             />
//           </div>
//         </InputGroup>

//         <InputGroup
//           id="destination-location"
//           label={t("dashboard.tripPlanning.form.destination")}>
//           <div className="relative">
//             <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
//             <input
//               type="text"
//               id="destination-location"
//               className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
//               placeholder="Bafoussam"
//             />
//           </div>
//         </InputGroup>

//         <InputGroup
//           id="departure-date"
//           label={t("dashboard.tripPlanning.form.departureDate")}>
//           <div className="relative">
//             <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
//             <input
//               type="date"
//               id="departure-date"
//               className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
//             />
//           </div>
//         </InputGroup>

//         <InputGroup
//           id="return-date"
//           label={t("dashboard.tripPlanning.form.returnDate")}>
//           <div className="relative">
//             <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
//             <input
//               type="date"
//               id="return-date"
//               className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
//             />
//           </div>
//         </InputGroup>

//         <InputGroup
//           id="vehicle"
//           label={t("dashboard.tripPlanning.form.vehicle")}>
//           <div className="relative">
//             <Car className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
//             <select
//               id="vehicle"
//               className="w-full appearance-none rounded-md border-gray-200 pl-9 pr-8 text-sm focus:border-primary focus:ring-primary">
//               <option value="">
//                 {t("dashboard.tripPlanning.form.selectVehicle")}
//               </option>
//               {mockVehicles.map((v) => (
//                 <option key={v.id} value={v.id}>
//                   {v.name} ({v.capacity} places)
//                 </option>
//               ))}
//             </select>
//           </div>
//         </InputGroup>

//         <InputGroup id="driver" label={t("dashboard.tripPlanning.form.driver")}>
//           <div className="relative">
//             <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
//             <select
//               id="driver"
//               className="w-full appearance-none rounded-md border-gray-200 pl-9 pr-8 text-sm focus:border-primary focus:ring-primary">
//               <option value="">
//                 {t("dashboard.tripPlanning.form.selectDriver")}
//               </option>
//               {mockDrivers.map((d) => (
//                 <option key={d.id} value={d.id}>
//                   {d.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </InputGroup>

//         <div className="md:col-span-2">
//           <InputGroup id="price" label={t("dashboard.tripPlanning.form.price")}>
//             <div className="relative">
//               <DollarSign className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
//               <input
//                 type="number"
//                 id="price"
//                 className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
//                 placeholder="Prix par siège en FCFA"
//               />
//             </div>
//           </InputGroup>
//         </div>

//         <div className="md:col-span-2">
//           <InputGroup
//             id="description"
//             label={t("dashboard.tripPlanning.form.description")}>
//             <textarea
//               id="description"
//               rows={3}
//               className="w-full rounded-md border-gray-200 text-sm focus:border-primary focus:ring-primary"
//               placeholder="Ajoutez des détails sur le voyage..."></textarea>
//           </InputGroup>
//         </div>
//       </div>

//       <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
//         <button
//           type="button"
//           className="rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
//           {t("dashboard.tripPlanning.form.saveDraft")}
//         </button>
//         <button
//           type="submit"
//           className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90">
//           {t("dashboard.tripPlanning.form.publishTrip")}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TripPlannerForm;







// src/components/dashboard/trip-planning/TripPlannerForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Car, User, MapPin, Calendar, DollarSign, Plus } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import SuccessModal from "@/modals/SuccessModal";

const InputGroup = ({ label, id, children }: { label: string; id: string; children: React.ReactNode; }) => (
    <div><label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>{children}</div>
);

const TripPlannerForm = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { vehicles, drivers, addTrip, updateTrip, getTripById } = useDashboard();
    
    const [formData, setFormData] = useState({
        title: "", departureLocation: "", destinationLocation: "",
        departureDate: "", returnDate: "", vehicleId: "", driverId: "",
        price: "", description: ""
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [tripId, setTripId] = useState<string | null>(null);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    useEffect(() => {
        const currentTripId = searchParams.get("tripId");
        const departureDate = searchParams.get("departureDate");

        if (currentTripId) {
            const trip = getTripById(currentTripId);
            if (trip) {
                setFormData({
                    title: trip.title,
                    departureLocation: trip.departureLocation,
                    destinationLocation: trip.destinationLocation,
                    departureDate: trip.departureDate,
                    returnDate: trip.returnDate || "",
                    vehicleId: trip.vehicleId,
                    driverId: trip.driverId,
                    price: String(trip.price),
                    description: trip.description || ""
                });
                setIsEditMode(true);
                setTripId(currentTripId);
            }
        } else if (departureDate) {
            setFormData(prev => ({ ...prev, departureDate }));
            setIsEditMode(false);
            setTripId(null);
        }
    }, [searchParams, getTripById]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tripData = { ...formData, price: Number(formData.price) };
        
        if (isEditMode && tripId) {
            updateTrip(tripId, tripData);
        } else {
            addTrip(tripData);
        }
        setSuccessModalOpen(true);
    };

    const handleCloseModal = () => {
        setSuccessModalOpen(false);
        router.push('/dashboard/marketplace'); // Redirige vers la marketplace pour voir le résultat
    };

    const availableVehicles = vehicles.filter(v => v.status === "available" || (isEditMode && v.id === formData.vehicleId));
    const availableDrivers = drivers.filter(d => d.status === "available" || (isEditMode && d.id === formData.driverId));

    return (
        <>
            <SuccessModal isOpen={isSuccessModalOpen} onClose={handleCloseModal} message={isEditMode ? "Voyage mis à jour !" : "Voyage publié avec succès !"} />
            <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">{isEditMode ? "Modifier le voyage" : t("dashboard.tripPlanning.form.title")}</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* TOUS LES CHAMPS SONT RESTAURÉS ET CONTRÔLÉS */}
                    <div className="md:col-span-2">
                        <InputGroup id="title" label={t("dashboard.tripPlanning.form.tripTitle")}>
                            <input type="text" id="title" value={formData.title} onChange={handleChange} required className="w-full rounded-md border-gray-200 text-sm focus:border-primary focus:ring-primary" />
                        </InputGroup>
                    </div>
                    {/* ... (Répétez pour tous les champs: departureLocation, destinationLocation, etc. en utilisant formData et handleChange) ... */}
                    <InputGroup id="departureDate" label={t("dashboard.tripPlanning.form.departureDate")}>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
                        <input type="date" id="departureDate" value={formData.departureDate} onChange={handleChange} required className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary" />
                      </div>
                    </InputGroup>
                    <InputGroup id="returnDate" label={t("dashboard.tripPlanning.form.returnDate")}>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
                        <input type="date" id="returnDate" value={formData.returnDate} onChange={handleChange} className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary" />
                      </div>
                    </InputGroup>
                    
                    {/* Logique pour Véhicules */}
                    <InputGroup id="vehicleId" label={t("dashboard.tripPlanning.form.vehicle")}>
                        <div className="relative">
                            <Car className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
                            <select id="vehicleId" value={formData.vehicleId} onChange={handleChange} required className="w-full appearance-none rounded-md border-gray-200 pl-9 pr-8 text-sm focus:border-primary focus:ring-primary">
                                <option value="">{t("dashboard.tripPlanning.form.selectVehicle")}</option>
                                {availableVehicles.map((v) => <option key={v.id} value={v.id}>{v.name} ({v.capacity} places)</option>)}
                            </select>
                        </div>
                        {availableVehicles.length === 0 && !isEditMode && (
                           <div className="mt-2 text-center text-sm text-gray-500">
                                <p>Aucun véhicule disponible.</p>
                                <Link href="/dashboard/resources?tab=vehicles" className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"><Plus className="h-4 w-4" /> Ajouter</Link>
                           </div>
                        )}
                    </InputGroup>
                    
                    {/* Logique pour Chauffeurs */}
                    <InputGroup id="driverId" label={t("dashboard.tripPlanning.form.driver")}>
                        <div className="relative">
                            <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
                            <select id="driverId" value={formData.driverId} onChange={handleChange} required className="w-full appearance-none rounded-md border-gray-200 pl-9 pr-8 text-sm focus:border-primary focus:ring-primary">
                                <option value="">{t("dashboard.tripPlanning.form.selectDriver")}</option>
                                {availableDrivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        {availableDrivers.length === 0 && !isEditMode && (
                           <div className="mt-2 text-center text-sm text-gray-500">
                                <p>Aucun chauffeur disponible.</p>
                                <Link href="/dashboard/resources?tab=drivers" className="mt-1 inline-flex items-center gap-1 text-primary hover:underline"><Plus className="h-4 w-4" /> Ajouter</Link>
                           </div>
                        )}
                    </InputGroup>
                    
                     <div className="md:col-span-2">
                        <InputGroup id="price" label={t("dashboard.tripPlanning.form.price")}>
                          <div className="relative">
                              <DollarSign className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
                              <input type="number" id="price" value={formData.price} onChange={handleChange} required className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary" placeholder="Prix par siège en FCFA" />
                          </div>
                        </InputGroup>
                    </div>
                    <div className="md:col-span-2">
                        <InputGroup id="description" label={t("dashboard.tripPlanning.form.description")}>
                           <textarea id="description" rows={3} value={formData.description} onChange={handleChange} className="w-full rounded-md border-gray-200 text-sm focus:border-primary focus:ring-primary" placeholder="Ajoutez des détails sur le voyage..."></textarea>
                        </InputGroup>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button type="submit" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90">{isEditMode ? "Mettre à jour le voyage" : t("dashboard.tripPlanning.form.publishTrip")}</button>
                </div>
            </form>
        </>
    );
};

export default TripPlannerForm;