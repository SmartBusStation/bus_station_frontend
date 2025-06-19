"use client";

import React from 'react';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import Image from 'next/image';

interface PackageCardProps {
  title: string;
  location: string;
  image: string;
  price: string;
  duration: string;
  rating: number;
  reviewCount: number;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  location,
  image,
  price,
  duration,
  rating,
  reviewCount,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md">
      <div className="relative h-48 w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 z-10"></div>
        {image ? (
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
            <span>No Image</span>
          </div>
        )}
        
        {/* Label */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium z-20">
          Best Seller
        </div>
        
        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md flex items-center space-x-1 text-xs font-medium z-20">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span>{rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" /> 
          <span>{location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{reviewCount} reviews</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <span className="ml-1 text-lg font-semibold text-blue-600">{price}</span>
          </div>
          
          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;