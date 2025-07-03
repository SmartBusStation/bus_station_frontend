// src/lib/types/dashboard.ts

export type StatCardData = {
  label: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ElementType;
};

export type ResourceTab = "vehicles" | "drivers" | "employees";

export interface Vehicle {
  id: string;
  name: string;
  type: "Bus" | "Minibus" | "Van";
  plate: string;
  capacity: number;
  status: "available" | "in_use" | "maintenance";
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  phone: string;
  status: "available" | "on_trip" | "on_leave";
}

export interface Employee {
  id: string;
  name: string;
  role: "Manager" | "Support" | "Agent";
  email: string;
  status: "active" | "inactive";
}

export interface TripPlan {
  id: string;
  title: string;
  departure: string;
  destination: string;
  departureDate: string;
  status: "draft" | "published" | "completed" | "cancelled";
  driverId: string | null;
  vehicleId: string | null;
}

export interface Booking {
  id: string;
  customerName: string;
  tripName: string;
  bookingDate: string;
  seats: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
}

// export interface PublishedTrip {
//   id: string;
//   title: string;
//   route: string;
//   departureDate: string;
//   reservations: number;
//   capacity: number;
//   estimatedRevenue: number;
//   status: "on_schedule" | "completed" | "cancelled";
// }

export type Trip = {
  id: string;
  title: string;
  departureLocation: string;
  destinationLocation: string;
  departureDate: string; // format "yyyy-MM-dd"
  returnDate?: string; // format "yyyy-MM-dd"
  price: number;
  description?: string;
  vehicleId: string;
  driverId: string;
  capacity: number;
  reservations: number;
  route: string;


  status: "on_schedule" | "completed" | "cancelled"; // Statut du voyage
};







export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: "published" | "completed" | "cancelled";
}

export interface Feedback {
  id: string;
  customerName: string;
  tripName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SubscriptionPlan {
  name: string;
  price: string;
  features: string[];
  isCurrent: boolean;
}

export interface BillingHistoryItem {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
}



// src/lib/types/dashboard.ts
// (Créez ce fichier s'il n'existe pas ou mettez-le à jour)

export type ResourceStatus = 'available' | 'in_use' | 'maintenance';
export type DriverStatus = 'available' | 'on_trip' | 'on_leave';
export type TripStatus = 'published' | 'completed' | 'cancelled';


export interface Driver {
  id: string;
  name: string;
  license: string;
  phone: string;
  status: DriverStatus;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: TripStatus;
  // Ajoutez d'autres champs du voyage si nécessaire
  departureLocation?: string;
  destinationLocation?: string;
  vehicleId?: string;
  driverId?: string;
  price?: number;
  description?: string;
}
