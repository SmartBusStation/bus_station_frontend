// src/components/dashboard/overview/RecentBookings.tsx
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ReservationPreviewDTO } from "@/lib/types/generated-api";

interface RecentBookingsProps {
  bookings: ReservationPreviewDTO[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => {
  const { t } = useTranslation();

  return (
      <div className="col-span-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm xl:col-span-4">
        <h4 className="mb-4 text-xl font-semibold text-gray-900">
          Réservations Récentes
        </h4>
        {bookings.length > 0 ? (
            <div className="flex flex-col gap-4">
              {bookings.map(({ reservation, voyage }) => (
                  <div key={reservation?.idReservation} className="flex items-center gap-4 rounded-md p-2 hover:bg-gray-50">
                    <Image
                        src={voyage?.smallImage || "/images/team/member1.svg"}
                        alt={voyage?.titre || 'Voyage'}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Réservation #{reservation?.idReservation?.substring(0, 8)}...</p>
                      <p className="text-sm text-gray-500">
                        Pour le voyage: "{voyage?.titre}"
                      </p>
                    </div>
                  </div>
              ))}
            </div>
        ) : (
            <p className="text-sm text-gray-500 text-center py-8">Aucune réservation récente.</p>
        )}
      </div>
  );
};

export default RecentBookings;