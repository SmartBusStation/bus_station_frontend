// src/components/dashboard/overview/RecentBookings.tsx
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const mockBookings = [
  {
    name: "Jean Dupont",
    trip: "Alpes Suisses",
    image: "/images/team/member1.svg",
  },
  {
    name: "Marie Curie",
    trip: "Plages de Kribi",
    image: "/images/team/member1.svg",
  },
  {
    name: "Pierre Simon",
    trip: "Tour de la Toscane",
    image: "/images/team/member1.svg",
  },
];

const RecentBookings = () => {
  const { t } = useTranslation();
  return (
    <div className="col-span-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm xl:col-span-4">
      <h4 className="mb-4 text-xl font-semibold text-gray-900">
        {t("dashboard.overview.recentBookings.title")}
      </h4>
      <div className="flex flex-col gap-4">
        {mockBookings.map((booking, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-md p-2 hover:bg-gray-50">
            <Image
              src={booking.image}
              alt={booking.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-gray-800">{booking.name}</p>
              <p className="text-sm text-gray-500">
                {t("dashboard.overview.recentBookings.bookedTrip", {
                  trip: booking.trip,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;
