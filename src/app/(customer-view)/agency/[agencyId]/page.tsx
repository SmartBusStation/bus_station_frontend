"use client";

import { useRouter } from "next/navigation";
import { travelAgencies, trips } from "@/lib/data/travelAgencies";
import AgencyProfile from "@/components/agencies-page-components/AgencyProfile";
import { ArrowLeft, Frown } from "lucide-react";
import Link from "next/link";

export default function AgencyDetailPage({
  params,
}: {
  params: { agencyId: string };
}) {
  const router = useRouter();
  const { agencyId } = params;

  const agency = travelAgencies.find((a) => a.id === agencyId);
  const agencyTrips = trips.filter((trip) => trip.agencyId === agencyId);

  if (!agency) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Frown className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Agence non trouvée</h2>
        <p className="text-gray-600 mt-2">
          L'agence que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link href="/agency">
          <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste des agences
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AgencyProfile
        agency={agency}
        trips={agencyTrips}
        onBack={() => router.back()}
      />
    </div>
  );
}
