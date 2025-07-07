// src/app/dashboard/bookings/page.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Eye, Filter, Search, CheckCircle, Clock, XCircle } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Booking } from "@/lib/types/dashboard";

const BookingsPage = () => {
  const { t } = useTranslation();

  const mockBookings: Booking[] = [
    {
      id: "BK-001",
      customerName: "Alice Martin",
      tripName: "Alpes Suisses Aventure",
      bookingDate: "2025-06-10",
      seats: 2,
      totalPrice: 15000,
      status: "confirmed",
    },
    {
      id: "BK-002",
      customerName: "Bob Johnson",
      tripName: "Tour de la Toscane",
      bookingDate: "2025-06-12",
      seats: 1,
      totalPrice: 9700,
      status: "pending",
    },
    {
      id: "BK-003",
      customerName: "Charlie Brown",
      tripName: "Plages de Kribi",
      bookingDate: "2025-06-05",
      seats: 4,
      totalPrice: 8600,
      status: "cancelled",
    },
    {
      id: "BK-004",
      customerName: "Diana Prince",
      tripName: "Alpes Suisses Aventure",
      bookingDate: "2025-06-14",
      seats: 1,
      totalPrice: 7800,
      status: "confirmed",
    },
  ];

  const getStatusComponent = (status: Booking["status"]) => {
    const commonClasses =
      "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium";
    switch (status) {
      case "confirmed":
        return (
          <div className={`${commonClasses} bg-green-100 text-green-700`}>
            <CheckCircle className="h-3 w-3" />
            Confirmée
          </div>
        );
      case "pending":
        return (
          <div className={`${commonClasses} bg-yellow-100 text-yellow-700`}>
            <Clock className="h-3 w-3" />
            En attente
          </div>
        );
      case "cancelled":
        return (
          <div className={`${commonClasses} bg-red-100 text-red-700`}>
            <XCircle className="h-3 w-3" />
            Annulée
          </div>
        );
    }
  };

  return (
    <>
      <PageHeader
        title={t("dashboard.bookings.title")}
        subtitle={t("dashboard.bookings.subtitle")}
      />

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("dashboard.bookings.searchPlaceholder")}
              className="w-full rounded-md border-gray-200 pl-9 pr-4 py-2 text-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            {t("dashboard.bookings.filters")}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  Client
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  Voyage
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  Date Rés.
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  Sièges
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  Montant
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  Statut
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {booking.customerName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {booking.tripName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {booking.bookingDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {booking.seats}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {booking.totalPrice.toLocaleString()} FCFA
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {getStatusComponent(booking.status)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button className="flex items-center gap-1 text-primary hover:underline">
                      <Eye className="h-4 w-4" /> Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
