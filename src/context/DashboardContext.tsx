// // src/context/DashboardContext.tsx
// "use client";

// import React, { createContext, useState, useContext, ReactNode } from "react";
// import { CalendarEvent, Vehicle, Driver } from "@/lib/types/dashboard";

// // Données initiales pour la démo
// const initialVehicles: Vehicle[] = [
//   { id: "veh-01", name: "Bus VIP", type: "Bus", plate: "CE 123 AB", capacity: 50, status: "available" },
//   { id: "veh-02", name: "Minibus Confort", type: "Minibus", plate: "LT 456 XY", capacity: 25, status: "available" },
//   { id: "veh-03", name: "Van Express", type: "Van", plate: "OU 789 WZ", capacity: 15, status: "maintenance" },
// ];

// const initialDrivers: Driver[] = [
//   { id: "drv-01", name: "Jean Dupont", license: "Permis D", phone: "0612345678", status: "available" },
//   { id: "drv-02", name: "Amina Diallo", license: "Permis D", phone: "0687654321", status: "on_trip" },
// ];

// const initialEvents: CalendarEvent[] = [
//     { id: "1", title: "Alpes Suisses", start: new Date(2025, 6, 20), end: new Date(2025, 6, 26), status: "published" },
//     { id: "2", title: "Plages de Kribi", start: new Date(2025, 6, 25), end: new Date(2025, 6, 28), status: "published" },
// ];

// interface DashboardContextType {
//   vehicles: Vehicle[];
//   drivers: Driver[];
//   events: CalendarEvent[];
//   addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
//   addDriver: (driver: Omit<Driver, "id">) => void;
//   addTrip: (event: Omit<CalendarEvent, "id">) => void;
//   // Potentiellement: updateTrip, deleteTrip, etc.
// }

// const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// export const DashboardProvider = ({ children }: { children: ReactNode }) => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
//   const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
//   const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

//   const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
//     setVehicles(prev => [...prev, { ...vehicle, id: `veh-${Date.now()}` }]);
//   };

//   const addDriver = (driver: Omit<Driver, "id">) => {
//     setDrivers(prev => [...prev, { ...driver, id: `drv-${Date.now()}` }]);
//   };
  
//   const addTrip = (trip: Omit<CalendarEvent, "id">) => {
//     setEvents(prev => [...prev, { ...trip, id: `trip-${Date.now()}` }]);
//   };

//   return (
//     <DashboardContext.Provider value={{ vehicles, drivers, events, addVehicle, addDriver, addTrip }}>
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboard = (): DashboardContextType => {
//   const context = useContext(DashboardContext);
//   if (!context) {
//     throw new Error("useDashboard must be used within a DashboardProvider");
//   }
//   return context;
// };








// src/context/DashboardContext.tsx (Version améliorée et corrigée)
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Vehicle, Driver, Trip } from "@/lib/types/dashboard";

// Données de démo
const initialVehicles: Vehicle[] = [
    { id: "veh-01", name: "Bus VIP", type: "Bus", plate: "CE 123 AB", capacity: 50, status: "available" },
    { id: "veh-02", name: "Minibus Confort", type: "Minibus", plate: "LT 456 XY", capacity: 25, status: "available" },
    { id: "veh-03", name: "Van Express", type: "Van", plate: "OU 789 WZ", capacity: 15, status: "maintenance" },
];
const initialDrivers: Driver[] = [
    { id: "drv-01", name: "Jean Dupont", license: "Permis D", phone: "0612345678", status: "available" },
    { id: "drv-02", name: "Amina Diallo", license: "Permis D", phone: "0687654321", status: "on_trip" },
];
const initialTrips: Trip[] = [];

interface DashboardContextType {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  addTrip: (tripData: Omit<Trip, "id" | "status">) => void;
  updateTrip: (tripId: string, tripData: Omit<Trip, "id" | "status">) => void;
  cancelTrip: (tripId: string) => void;
  getTripById: (tripId: string) => Trip | undefined;
  getVehicleById: (vehicleId: string) => Vehicle | undefined;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  const updateResourceStatus = (resourceId: string, status: "available" | "on_trip" | "maintenance" | "in_use" | "on_leave") => {
      setVehicles(prev => prev.map(v => v.id === resourceId ? { ...v, status: status as any } : v));
      setDrivers(prev => prev.map(d => d.id === resourceId ? { ...d, status: status as any } : d));
  };
  
  const addTrip = (tripData: Omit<Trip, "id" | "status">) => {
    const newTrip: Trip = { ...tripData, id: `trip-${Date.now()}`, status: "on_schedule" };
    setTrips(prev => [...prev, newTrip]);
    // Mettre à jour le statut des ressources
    updateResourceStatus(tripData.vehicleId, "on_trip");
    updateResourceStatus(tripData.driverId, "on_trip");
  };

  const updateTrip = (tripId: string, tripData: Omit<Trip, "id" | "status">) => {
    setTrips(prevTrips => {
      const oldTrip = prevTrips.find(t => t.id === tripId);
      if (oldTrip) {
        // Libérer les anciennes ressources si elles ont changé
        if (oldTrip.vehicleId !== tripData.vehicleId) {
          updateResourceStatus(oldTrip.vehicleId, "available");
        }
        if (oldTrip.driverId !== tripData.driverId) {
          updateResourceStatus(oldTrip.driverId, "available");
        }
      }
      // Mettre à jour les nouvelles ressources
      updateResourceStatus(tripData.vehicleId, "on_trip");
      updateResourceStatus(tripData.driverId, "on_trip");

      // Mettre à jour le voyage
      return prevTrips.map(t => t.id === tripId ? { ...t, ...tripData } : t);
    });
  };

  const cancelTrip = (tripId: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      // Libérer les ressources
      updateResourceStatus(trip.vehicleId, "available");
      updateResourceStatus(trip.driverId, "available");
      // Mettre à jour le statut du voyage
      setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: "cancelled" } : t));
    }
  };
  
  const getTripById = (tripId: string) => trips.find(t => t.id === tripId);
  const getVehicleById = (vehicleId: string) => vehicles.find(v => v.id === vehicleId);

  return (
    <DashboardContext.Provider value={{ vehicles, drivers, trips, addTrip, updateTrip, cancelTrip, getTripById, getVehicleById }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
};