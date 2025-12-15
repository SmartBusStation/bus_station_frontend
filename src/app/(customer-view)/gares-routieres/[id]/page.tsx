import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_GARES, MOCK_AGENCES, MOCK_DEPARTS } from '@/lib/data/gares-routieres';
import DetailHeader from '@/components/bus-station-detail-page-components/DetailHeader';
import ServicesSection from '@/components/bus-station-detail-page-components/ServicesSection';
import TabsSection from '@/components/bus-station-detail-page-components/TabsSection';

type GareDetailProps = {
  params: {
    id: string;
  }
}

// Cette fonction peut être utilisée par Next.js pour générer les pages statiquement
export async function generateStaticParams() {
  return MOCK_GARES.map(gare => ({
    id: gare.id,
  }));
}

const GareDetailPage = ({ params }: GareDetailProps) => {
  const station = MOCK_GARES.find(g => g.id === params.id);

  if (!station) {
    // Dans une vraie application, on utiliserait le `notFound()` de Next.js
    // pour afficher la page 404 personnalisée.
    // notFound(); 
    return <div className="text-center py-20">Gare non trouvée</div>;
  }

  // Pour la démo, nous passons toutes les agences et tous les départs.
  // Dans une vraie application, ceux-ci seraient filtrés par gare (via API).
  const agences = MOCK_AGENCES;
  const departs = MOCK_DEPARTS;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <DetailHeader station={station} />
        <ServicesSection services={station.services} />
        <TabsSection station={station} agences={agences} departs={departs} />
         <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Emplacement sur la carte</h2>
             <div className="aspect-w-16 aspect-h-9">
                <iframe 
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${station.localisation.latitude},${station.localisation.longitude}`} 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    className="rounded-md"
                ></iframe>
                <p className="text-xs text-gray-500 mt-2">Note: L'affichage de la carte requiert une clé API Google Maps.</p>
             </div>
         </div>
      </div>
    </div>
  );
};

export default GareDetailPage;
