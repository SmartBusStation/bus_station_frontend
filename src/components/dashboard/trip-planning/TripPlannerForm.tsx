// src/components/dashboard/trip-planning/TripPlannerForm.tsx
"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Car, User, MapPin, Calendar,  DollarSign } from "lucide-react";
import { Vehicle, Driver } from "@/lib/types/dashboard";

const InputGroup = ({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
  </div>
);

const TripPlannerForm = () => {
  const { t } = useTranslation();

  const mockVehicles: Vehicle[] = [
    {
      id: "veh-01",
      name: "Bus VIP",
      type: "Bus",
      plate: "CE 123 AB",
      capacity: 50,
      status: "available",
    },
    {
      id: "veh-02",
      name: "Minibus Confort",
      type: "Minibus",
      plate: "LT 456 XY",
      capacity: 25,
      status: "available",
    },
  ];

  const mockDrivers: Driver[] = [
    {
      id: "drv-01",
      name: "Jean Dupont",
      license: "Permis D",
      phone: "0612345678",
      status: "available",
    },
    {
      id: "drv-02",
      name: "Amina Diallo",
      license: "Permis D",
      phone: "0687654321",
      status: "available",
    },
  ];

  return (
    <form className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {t("dashboard.tripPlanning.form.title")}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <InputGroup
            id="trip-title"
            label={t("dashboard.tripPlanning.form.tripTitle")}>
            <input
              type="text"
              id="trip-title"
              className="w-full rounded-md border-gray-200 text-sm focus:border-primary focus:ring-primary"
              placeholder="Ex: Aventure dans les Alpes"
            />
          </InputGroup>
        </div>

        <InputGroup
          id="departure-location"
          label={t("dashboard.tripPlanning.form.departure")}>
          <div className="relative">
            <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <input
              type="text"
              id="departure-location"
              className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
              placeholder="Yaoundé"
            />
          </div>
        </InputGroup>

        <InputGroup
          id="destination-location"
          label={t("dashboard.tripPlanning.form.destination")}>
          <div className="relative">
            <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <input
              type="text"
              id="destination-location"
              className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
              placeholder="Bafoussam"
            />
          </div>
        </InputGroup>

        <InputGroup
          id="departure-date"
          label={t("dashboard.tripPlanning.form.departureDate")}>
          <div className="relative">
            <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <input
              type="date"
              id="departure-date"
              className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </InputGroup>

        <InputGroup
          id="return-date"
          label={t("dashboard.tripPlanning.form.returnDate")}>
          <div className="relative">
            <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <input
              type="date"
              id="return-date"
              className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </InputGroup>

        <InputGroup
          id="vehicle"
          label={t("dashboard.tripPlanning.form.vehicle")}>
          <div className="relative">
            <Car className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <select
              id="vehicle"
              className="w-full appearance-none rounded-md border-gray-200 pl-9 pr-8 text-sm focus:border-primary focus:ring-primary">
              <option value="">
                {t("dashboard.tripPlanning.form.selectVehicle")}
              </option>
              {mockVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.capacity} places)
                </option>
              ))}
            </select>
          </div>
        </InputGroup>

        <InputGroup id="driver" label={t("dashboard.tripPlanning.form.driver")}>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
            <select
              id="driver"
              className="w-full appearance-none rounded-md border-gray-200 pl-9 pr-8 text-sm focus:border-primary focus:ring-primary">
              <option value="">
                {t("dashboard.tripPlanning.form.selectDriver")}
              </option>
              {mockDrivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </InputGroup>

        <div className="md:col-span-2">
          <InputGroup id="price" label={t("dashboard.tripPlanning.form.price")}>
            <div className="relative">
              <DollarSign className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-gray-400 -translate-y-1/2" />
              <input
                type="number"
                id="price"
                className="w-full rounded-md border-gray-200 pl-9 text-sm focus:border-primary focus:ring-primary"
                placeholder="Prix par siège en FCFA"
              />
            </div>
          </InputGroup>
        </div>

        <div className="md:col-span-2">
          <InputGroup
            id="description"
            label={t("dashboard.tripPlanning.form.description")}>
            <textarea
              id="description"
              rows={3}
              className="w-full rounded-md border-gray-200 text-sm focus:border-primary focus:ring-primary"
              placeholder="Ajoutez des détails sur le voyage..."></textarea>
          </InputGroup>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {t("dashboard.tripPlanning.form.saveDraft")}
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90">
          {t("dashboard.tripPlanning.form.publishTrip")}
        </button>
      </div>
    </form>
  );
};

export default TripPlannerForm;
