// components/AgenciesPageComponents/EmptyAgencyView.tsx
"use client";

import { MapPin, Search, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EmptyAgencyView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <div className="bg-blue-100 p-6 rounded-full mb-6">
        <Globe className="h-12 w-12 text-primary" />
      </div>

      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
        {t("agenciesPage.emptyView.title")}
      </h2>

      <p className="text-xl text-gray-600 text-center max-w-lg mb-8">
        {t("agenciesPage.emptyView.description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {[
          {
            icon: <Search className="h-8 w-8 text-primary" />,
            title: t("agenciesPage.emptyView.tip1.title"),
            description: t("agenciesPage.emptyView.tip1.description"),
          },
          {
            icon: <MapPin className="h-8 w-8 text-primary" />,
            title: t("agenciesPage.emptyView.tip2.title"),
            description: t("agenciesPage.emptyView.tip2.description"),
          },
          {
            icon: <Globe className="h-8 w-8 text-primary" />,
            title: t("agenciesPage.emptyView.tip3.title"),
            description: t("agenciesPage.emptyView.tip3.description"),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:-translate-y-1 transition-transform">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
