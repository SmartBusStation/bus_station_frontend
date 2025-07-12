// src/components/dashboard/overview/OverviewCharts.tsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useTranslation } from "react-i18next";
import { AgenceEvolutionDTO } from "@/lib/types/generated-api";
import { format, parseISO } from 'date-fns';

interface OverviewChartsProps {
  data: AgenceEvolutionDTO | null;
}

const OverviewCharts: React.FC<OverviewChartsProps> = ({ data }) => {
  const { t } = useTranslation();

  // On formate les données pour le graphique
  const chartData = data?.evolutionRevenus?.map(item => ({
    name: format(parseISO(item.date!), 'MMM'), // ex: "Jan", "Fév"
    Revenus: item.montant,
  })) || [];

  return (
      <div className="col-span-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm xl:col-span-8">
        <h4 className="mb-4 text-xl font-semibold text-gray-900">
          Évolution des Revenus
        </h4>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${Number(value).toLocaleString()} FCFA`} />
              <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "0.5rem" }}
                  labelStyle={{ color: "#18181b", fontWeight: "bold" }}
                  formatter={(value) => `${Number(value).toLocaleString()} FCFA`}
              />
              <Legend />
              <Bar dataKey="Revenus" fill="#3b82f6" name="Revenus (FCFA)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
};

export default OverviewCharts;