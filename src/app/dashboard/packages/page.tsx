"use client";

import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Grid, List ,Star , Users , MapPin } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import PackageCard from '../components/ui/cards/PackageCard';

const PackagesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Mock data for packages
  const packages = [
    {
      id: 1,
      title: 'Tropical Paradise Retreat',
      location: 'Maldives',
      image: '/public/voyag.jpg',
      price: '$2,100',
      duration: '7 Days / 6 Nights',
      rating: 4.9,
      reviewCount: 127,
      features: ['All-Inclusive', 'Luxury Accommodation', 'Spa Treatments', 'Water Sports', 'Sustainability'],
      description: 'Escape to a tropical haven where pristine beaches, lush greenery, and luxurious accommodations await. Perfect for those looking to unwind and experience the ultimate relaxation.'
    },
    {
      id: 2,
      title: 'Venice Dreams',
      location: 'Venice, Italy',
      image: '/public/voyag.jpg',
      price: '$1,500',
      duration: '8 Days / 7 Nights',
      rating: 4.8,
      reviewCount: 156,
      features: ['Historic Hotel', 'Canal Tours', 'Culinary Experiences', 'Museum Access'],
      description: 'Stay in a charming boutique hotel along the famed Grand Canal. Gondola ride through the canals, guided tour of St. Mark\'s Basilica and visit to the Murano glass-blowing factory.'
    },
    {
      id: 3,
      title: 'Safari Adventure',
      location: 'Serengeti, Tanzania',
      image: '/public/voyag.jpg',
      price: '$3,200',
      duration: '8 Days / 7 Nights',
      rating: 4.9,
      reviewCount: 93,
      features: ['Luxury Tented Camps', 'Game Drives', 'Local Guides', 'Safari Cuisine'],
      description: 'Luxury tented camps in the heart of the Serengeti. Full board with local and international cuisine. Daily game drives with experienced safari guides. Visit to a local Maasai village, morning breakfast bush experience.'
    },
    {
      id: 4,
      title: 'Alpine Escape',
      location: 'Swiss Alps, Switzerland',
      image: '/public/voyag.jpg',
      price: '$2,100',
      duration: '7 Days / 6 Nights',
      rating: 4.7,
      reviewCount: 118,
      features: ['Mountain Chalets', 'Skiing', 'Spa', 'Adventure Activities'],
      description: 'Experience the majestic Swiss Alps with stunning mountain views, world-class skiing, and luxurious spa treatments. Perfect for adventure seekers and those looking to relax in nature.'
    },
    {
      id: 5,
      title: 'Parisian Romance',
      location: 'Paris, France',
      image: '/public/voyag.jpg',
      price: '$1,800',
      duration: '5 Days / 4 Nights',
      rating: 4.7,
      reviewCount: 205,
      features: ['Boutique Hotel', 'Eiffel Tower Views', 'Culinary Tours', 'Seine River Cruise'],
      description: 'Stay in a romantic boutique hotel with views of the Eiffel Tower. Enjoy private culinary tours, skip-the-line access to major attractions, and a sunset cruise on the Seine River.'
    },
    {
      id: 6,
      title: 'Tokyo Cultural Adventure',
      location: 'Tokyo, Japan',
      image: '/public/voyag.jpg',
      price: '$2,500',
      duration: '9 Days / 8 Nights',
      rating: 4.8,
      reviewCount: 138,
      features: ['Central Location', 'Cultural Experiences', 'Food Tours', 'Technology Tours'],
      description: 'Immerse yourself in the fascinating blend of ancient traditions and cutting-edge technology in Tokyo. From historic temples to robotic restaurants, experience it all in this comprehensive city tour.'
    },
    {
      id: 7,
      title: 'Greek Island Hopping',
      location: 'Various Greek Islands',
      image: '/public/voyag.jpg',
      price: '$2,300',
      duration: '10 Days / 9 Nights',
      rating: 4.9,
      reviewCount: 173,
      features: ['Island Transfers', 'Beachfront Hotels', 'Archaeological Tours', 'Sunset Cruises'],
      description: 'Visit multiple Greek islands with seamless transfers between each destination. Enjoy beachfront accommodations, guided archaeological tours, and authentic Greek cuisine. Perfect for history lovers and beach enthusiasts.'
    },
    {
      id: 8,
      title: 'Caribbean Cruise',
      location: 'Caribbean Islands',
      image: '/public/voyag.jpg',
      price: '$2,800',
      duration: '10 Days / 9 Nights',
      rating: 4.6,
      reviewCount: 189,
      features: ['Luxury Cruise Ship', 'Island Excursions', 'All-Inclusive', 'Entertainment'],
      description: 'Set sail on a luxurious cruise ship exploring multiple Caribbean islands. All-inclusive package with gourmet dining, world-class entertainment, and exciting shore excursions at each port of call.'
    },
  ];

  // Function to render package cards in grid mode
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          title={pkg.title}
          location={pkg.location}
          image={pkg.image}
          price={pkg.price}
          duration={pkg.duration}
          rating={pkg.rating}
          reviewCount={pkg.reviewCount}
        />
      ))}
    </div>
  );

  // Function to render package cards in list mode
  const renderListView = () => (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <div key={pkg.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="relative h-48 md:h-auto md:w-1/3">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 z-10"></div>
            <div className="h-full w-full bg-gray-200"></div>
            
            {/* Label */}
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium z-20">
              Best Seller
            </div>
            
            {/* Rating */}
            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md flex items-center space-x-1 text-xs font-medium z-20">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span>{pkg.rating}</span>
            </div>
          </div>
          
          <div className="p-4 md:p-6 md:w-2/3">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{pkg.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" /> 
                  <span>{pkg.location}</span>
                </div>
              </div>
              
              <div className="mt-2 md:mt-0 md:ml-4 text-right">
                <span className="text-sm text-gray-500">From</span>
                <span className="ml-1 text-lg font-semibold text-blue-600">{pkg.price}</span>
                <div className="text-sm text-gray-500">{pkg.duration}</div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 md:line-clamp-3">{pkg.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {pkg.features.slice(0, 4).map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {feature}
                </span>
              ))}
              {pkg.features.length > 4 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  +{pkg.features.length - 4} more
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                <span>{pkg.reviewCount} reviews</span>
              </div>
              
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-800">Travel Packages</h1>
          
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm font-medium">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Package
            </button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search packages..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center text-sm font-medium">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className={`px-3 py-2 flex items-center ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'} transition-colors`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  className={`px-3 py-2 flex items-center ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'} transition-colors`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Package */}
        <div className="relative h-64 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-transparent z-10"></div>
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="px-8 max-w-lg">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mb-2">
                New Package
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">Tropical Paradise Retreat</h2>
              <p className="text-blue-100 mb-4 line-clamp-2">
                Escape to a tropical haven where pristine beaches, lush greenery, and luxurious accommodations await.
              </p>
              <div className="flex space-x-3">
                <span className="text-white text-sm">From <span className="font-bold text-lg">$2,100</span></span>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Packages Grid/List */}
        <div className="pb-6">
          {viewMode === 'grid' ? renderGridView() : renderListView()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PackagesPage;