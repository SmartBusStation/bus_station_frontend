// // src/components/dashboard/marketplace/PublishedTripCard.tsx
// import React from "react";
// import { useTranslation } from "react-i18next";
// import { MapPin, Calendar, DollarSign, XCircle } from "lucide-react";
// import { PublishedTrip } from "@/lib/types/dashboard";

// const PublishedTripCard = ({ trip }: { trip: PublishedTrip }) => {
//   const { t } = useTranslation();
//   const reservationPercentage = (trip.reservations / trip.capacity) * 100;

//   const getStatusInfo = () => {
//     switch (trip.status) {
//       case "on_schedule":
//         return {
//           text: t("dashboard.agencyMarketplace.status.onSchedule"),
//           color: "bg-blue-100 text-blue-700",
//         };
//       case "completed":
//         return {
//           text: t("dashboard.agencyMarketplace.status.completed"),
//           color: "bg-green-100 text-green-700",
//         };
//       case "cancelled":
//         return {
//           text: t("dashboard.agencyMarketplace.status.cancelled"),
//           color: "bg-red-100 text-red-700",
//         };
//       default:
//         return { text: "Inconnu", color: "bg-gray-100 text-gray-700" };
//     }
//   };

//   return (
//     <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
//       <div className="flex items-start justify-between mb-3">
//         <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
//         <div
//           className={`rounded-full px-2.5 py-1 text-xs font-medium ${
//             getStatusInfo().color
//           }`}>
//           {getStatusInfo().text}
//         </div>
//       </div>

//       <div className="space-y-2 text-sm text-gray-600 mb-4">
//         <p className="flex items-center gap-2">
//           <MapPin className="h-4 w-4 text-gray-400" /> {trip.route}
//         </p>
//         <p className="flex items-center gap-2">
//           <Calendar className="h-4 w-4 text-gray-400" /> {trip.departureDate}
//         </p>
//       </div>

//       <div>
//         <div className="flex justify-between text-sm mb-1">
//           <span className="font-medium text-gray-700">
//             {t("dashboard.agencyMarketplace.reservations")}
//           </span>
//           <span>
//             {trip.reservations} / {trip.capacity}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div
//             className="bg-primary h-2 rounded-full"
//             style={{ width: `${reservationPercentage}%` }}></div>
//         </div>
//       </div>

//       <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
//         <div className="flex items-center gap-2 text-sm">
//           <DollarSign className="h-4 w-4 text-green-500" />
//           <span className="font-medium text-gray-700">
//             {t("dashboard.agencyMarketplace.estRevenue")}:
//           </span>
//           <span className="font-semibold text-green-600">
//             {trip.estimatedRevenue.toLocaleString()}FCFA
//           </span>
//         </div>
//         {trip.status === "on_schedule" && (
//           <button className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700">
//             <XCircle className="h-4 w-4" />
//             {t("dashboard.agencyMarketplace.cancelTrip")}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PublishedTripCard;



// src/components/dashboard/marketplace/PublishedTripCard.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Edit, XCircle } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Trip } from "@/lib/types/dashboard";






const PublishedTripCard = ({ trip }: { trip: Trip }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { cancelTrip, getVehicleById } = useDashboard();
  
  const vehicle = getVehicleById(trip.vehicleId);
  const capacity = vehicle ? vehicle.capacity : 0;
  // Note: la logique de 'reservations' et 'revenue' n'est pas encore dans le contexte, on simule.
  const reservations = 0; 
  const reservationPercentage = capacity > 0 ? (reservations / capacity) * 100 : 0;


  const getStatusInfo = () => {
    switch (trip.status) {
      case "on_schedule":
        return {
          text: t("dashboard.agencyMarketplace.status.onSchedule"),
          color: "bg-blue-100 text-blue-700",
        };
      case "completed":
        return {
          text: t("dashboard.agencyMarketplace.status.completed"),
          color: "bg-green-100 text-green-700",
        };
      case "cancelled":
        return {
          text: t("dashboard.agencyMarketplace.status.cancelled"),
          color: "bg-red-100 text-red-700",
        };
      default:
        return { text: "Inconnu", color: "bg-gray-100 text-gray-700" };
    }
  };


  const handleEdit = () => {
    router.push(`/dashboard/trip-planning?tripId=${trip.id}`);
  };

  const handleCancel = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler ce voyage ? Cette action est irréversible.")) {
      cancelTrip(trip.id);
    }
  };
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      {/* ... (partie supérieure de la carte avec titre, statut, etc.) ... */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
        <div
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            getStatusInfo().color
          }`}>
          {getStatusInfo().text}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" /> {trip.route}
        </p>
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" /> {trip.departureDate}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">
            {t("dashboard.agencyMarketplace.reservations")}
          </span>
          <span>
            {trip.reservations} / {trip.capacity}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${reservationPercentage}%` }}></div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
        {trip.status === "on_schedule" && (
          <>
            <button onClick={handleEdit} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800">
                <Edit className="h-4 w-4" /> Modifier
            </button>
            <button onClick={handleCancel} className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700">
                <XCircle className="h-4 w-4" /> Annuler
            </button>
          </>
        )}
         {trip.status !== "on_schedule" && (
             <p className="text-sm text-gray-500">Voyage {trip.status === 'cancelled' ? 'annulé' : 'terminé'}</p>
         )}
      </div>
    </div>
  );
};

export default PublishedTripCard;