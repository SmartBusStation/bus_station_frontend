import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, MapPin } from 'lucide-react';
import { GareRoutiere } from '@/lib/types/gares-routiere';

type StationCardProps = {
  station: GareRoutiere;
};

const StationCard = ({ station }: StationCardProps) => {
  return (
    <Link href={`/gares-routieres/${station.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
        <div className="relative h-48 w-full">
          <Image
            src={station.imageUrl}
            alt={`Photo de ${station.nom}`}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{station.nom}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin size={14} className="mr-1.5" />
            <span>{station.quartier}, {station.ville}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <Briefcase size={14} className="mr-1.5" />
              <span className="font-semibold">{station.nbAgencesAffiliees} agences</span>
            </div>
             <div className={`text-xs font-semibold py-1 px-2.5 rounded-full ${
                station.estOuvert ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {station.estOuvert ? 'Ouvert' : 'Fermé'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StationCard;
