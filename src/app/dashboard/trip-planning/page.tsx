"use client";

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Plus, X, Check, Edit, Trash2, Calendar, Clock, MapPin, Users, Car, User, ArrowRight, MoreHorizontal, Grid, List } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useResourceContext, Trip, Driver, Vehicle, TripStatus } from '@/context/ResourceContext';

const TripPlanningPage = () => {
  const { 
    trips, 
    drivers, 
    vehicles, 
    addTrip, 
    updateTrip, 
    deleteTrip, 
    assignDriverToTrip,
    assignVehicleToTrip,
    unassignDriverFromTrip,
    unassignVehicleFromTrip,
    getAvailableDrivers,
    getAvailableVehicles 
  } = useResourceContext();
  
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [tripStatusFilter, setTripStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [isAssignDriverModalOpen, setIsAssignDriverModalOpen] = useState(false);
  const [isAssignVehicleModalOpen, setIsAssignVehicleModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  
  // New form for adding a trip
  const [newTrip, setNewTrip] = useState({
    name: '',
    description: '',
    departureLocation: '',
    destination: '',
    intermediateStops: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    estimatedDistance: '',
    passengerCount: '',
    vehicleType: '',
    services: ''
  });

  // Filter trips based on search query and filters
  const filteredTrips = trips.filter(trip => {
    // Filter by search query
    if (searchQuery && !trip.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !trip.departureLocation.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !trip.destination.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (tripStatusFilter && trip.status !== tripStatusFilter) {
      return false;
    }
    
    return true;
  });

  // Available drivers and vehicles for assignment
  const availableDrivers = getAvailableDrivers();
  const availableVehicles = getAvailableVehicles();

  // Generate status badge class based on status
  const getStatusBadgeClass = (status: TripStatus) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-indigo-100 text-indigo-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingTrip) {
      setEditingTrip({ ...editingTrip, [name]: value });
    } else {
      setNewTrip({ ...newTrip, [name]: value });
    }
  };

  // Handle adding a new trip
  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create trip object from form data
    addTrip({
      name: newTrip.name,
      description: newTrip.description,
      departureLocation: newTrip.departureLocation,
      destination: newTrip.destination,
      intermediateStops: newTrip.intermediateStops ? newTrip.intermediateStops.split(',').map(stop => stop.trim()) : undefined,
      departureDate: newTrip.departureDate,
      departureTime: newTrip.departureTime,
      returnDate: newTrip.returnDate,
      returnTime: newTrip.returnTime,
      estimatedDistance: newTrip.estimatedDistance,
      passengerCount: parseInt(newTrip.passengerCount),
      vehicleType: newTrip.vehicleType,
      services: newTrip.services ? newTrip.services.split(',').map(service => service.trim()) : undefined,
      status: 'Draft',
      vehicle: null,
      driver: null
    });
    
    // Reset form and close modal
    setNewTrip({
      name: '',
      description: '',
      departureLocation: '',
      destination: '',
      intermediateStops: '',
      departureDate: '',
      departureTime: '',
      returnDate: '',
      returnTime: '',
      estimatedDistance: '',
      passengerCount: '',
      vehicleType: '',
      services: ''
    });
    setIsAddTripModalOpen(false);
  };

  // Handle saving edited trip
  const handleSaveEdit = () => {
    if (editingTrip) {
      updateTrip(editingTrip.id, editingTrip);
      setEditingTrip(null);
    }
  };

  // Handle deleting a trip
  const handleDeleteTrip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      deleteTrip(id);
      if (selectedTripId === id) {
        setSelectedTripId(null);
      }
    }
  };

  // Handle assigning driver to trip
  const handleAssignDriver = () => {
    if (selectedTripId && selectedDriverId) {
      assignDriverToTrip(selectedDriverId, selectedTripId);
      setIsAssignDriverModalOpen(false);
      setSelectedDriverId(null);
    }
  };

  // Handle assigning vehicle to trip
  const handleAssignVehicle = () => {
    if (selectedTripId && selectedVehicleId) {
      assignVehicleToTrip(selectedVehicleId, selectedTripId);
      setIsAssignVehicleModalOpen(false);
      setSelectedVehicleId(null);
    }
  };

  // Handle unassigning driver from trip
  const handleUnassignDriver = (tripId: string) => {
    unassignDriverFromTrip(tripId);
  };

  // Handle unassigning vehicle from trip
  const handleUnassignVehicle = (tripId: string) => {
    unassignVehicleFromTrip(tripId);
  };

  // Get driver details by ID
  const getDriverDetails = (driverId: string) => {
    return drivers.find(driver => driver.id === driverId) || null;
  };

  // Get vehicle details by ID
  const getVehicleDetails = (vehicleId: string) => {
    return vehicles.find(vehicle => vehicle.id === vehicleId) || null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Planification des Voyages</h1>
            <p className="text-gray-500 mt-1">Gérez tous vos voyages et affectez des ressources</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm font-medium"
              onClick={() => setIsAddTripModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un Voyage
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher par nom, lieu de départ, destination..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={tripStatusFilter || ''}
                onChange={(e) => setTripStatusFilter(e.target.value || null)}
              >
                <option value="">Statut: Tous</option>
                <option value="Draft">Brouillon</option>
                <option value="Pending">En attente</option>
                <option value="Confirmed">Confirmé</option>
                <option value="In Progress">En cours</option>
                <option value="Completed">Terminé</option>
                <option value="Cancelled">Annulé</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTrips.map((trip) => {
              const driver = trip.driver ? getDriverDetails(trip.driver) : null;
              const vehicle = trip.vehicle ? getVehicleDetails(trip.vehicle) : null;
              
              return (
                <div 
                  key={trip.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedTripId(trip.id)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800">{trip.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(trip.status)}`}>
                        {trip.status}
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{trip.departureDate}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{trip.departureTime}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{trip.departureLocation}</span>
                        <ArrowRight className="h-3 w-3 mx-1" />
                        <span className="truncate">{trip.destination}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{trip.passengerCount} passagers</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t border-gray-100 pt-3">
                      <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Ressources assignées</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">Véhicule:</span>
                          </div>
                          {vehicle ? (
                            <span className="text-sm font-medium">{vehicle.name}</span>
                          ) : (
                            <span className="text-sm text-orange-500">Non assigné</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">Chauffeur:</span>
                          </div>
                          {driver ? (
                            <span className="text-sm font-medium">{driver.firstName} {driver.lastName}</span>
                          ) : (
                            <span className="text-sm text-orange-500">Non assigné</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">ID: {trip.id}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTrip(trip);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        onClick={(e) => handleDeleteTrip(trip.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Voyage
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Heure
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Itinéraire
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Passagers
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Véhicule
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chauffeur
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredTrips.map((trip) => {
                    const driver = trip.driver ? getDriverDetails(trip.driver) : null;
                    const vehicle = trip.vehicle ? getVehicleDetails(trip.vehicle) : null;
                    
                    return (
                      <tr 
                        key={trip.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedTripId(trip.id)}
                      >
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{trip.name}</div>
                          <div className="text-sm text-gray-500">ID: {trip.id}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{trip.departureDate}</div>
                          <div className="text-sm text-gray-500">{trip.departureTime}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{trip.departureLocation}</div>
                          <div className="text-sm text-gray-500">→ {trip.destination}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {trip.passengerCount} passagers
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          {vehicle ? (
                            <div className="text-sm text-gray-900">{vehicle.name}</div>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Non assigné
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          {driver ? (
                            <div className="text-sm text-gray-900">{driver.firstName} {driver.lastName}</div>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Non assigné
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(trip.status)}`}>
                            {trip.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTrip(trip);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800"
                              onClick={(e) => handleDeleteTrip(trip.id, e)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredTrips.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun voyage trouvé avec les filtres actuels.</p>
              </div>
            )}
          </div>
        )}
        
        {/* No results message */}
        {filteredTrips.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Aucun voyage trouvé</h3>
            <p className="text-gray-500 mb-4">Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              onClick={() => {
                setSearchQuery('');
                setTripStatusFilter(null);
              }}
            >
              Effacer les filtres
            </button>
          </div>
        )}
      </div>
      
      {/* Add Trip Modal */}
      {isAddTripModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddTripModalOpen(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Fermer</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Ajouter un nouveau voyage</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Remplissez les informations ci-dessous pour créer un nouveau voyage.
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleAddTrip} className="mt-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du voyage</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newTrip.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newTrip.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="departureLocation" className="block text-sm font-medium text-gray-700">Lieu de départ</label>
                      <input
                        type="text"
                        name="departureLocation"
                        id="departureLocation"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.departureLocation}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        id="destination"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.destination}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">Date de départ</label>
                      <input
                        type="date"
                        name="departureDate"
                        id="departureDate"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.departureDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">Heure de départ</label>
                      <input
                        type="time"
                        name="departureTime"
                        id="departureTime"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.departureTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">Date de retour</label>
                      <input
                        type="date"
                        name="returnDate"
                        id="returnDate"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.returnDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="returnTime" className="block text-sm font-medium text-gray-700">Heure de retour</label>
                      <input
                        type="time"
                        name="returnTime"
                        id="returnTime"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.returnTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="estimatedDistance" className="block text-sm font-medium text-gray-700">Distance estimée (km)</label>
                      <input
                        type="text"
                        name="estimatedDistance"
                        id="estimatedDistance"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.estimatedDistance}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="passengerCount" className="block text-sm font-medium text-gray-700">Nombre de passagers</label>
                      <input
                        type="number"
                        name="passengerCount"
                        id="passengerCount"
                        min="1"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={newTrip.passengerCount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Type de véhicule préféré</label>
                    <select
                      name="vehicleType"
                      id="vehicleType"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newTrip.vehicleType}
                      onChange={handleInputChange}
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Bus">Bus</option>
                      <option value="Minibus">Minibus</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="intermediateStops" className="block text-sm font-medium text-gray-700">
                      Arrêts intermédiaires (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      name="intermediateStops"
                      id="intermediateStops"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Lyon, Marseille, etc."
                      value={newTrip.intermediateStops}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="services" className="block text-sm font-medium text-gray-700">
                      Services (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      name="services"
                      id="services"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Guide, WiFi, Restauration, etc."
                      value={newTrip.services}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Ajouter le voyage
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setIsAddTripModalOpen(false)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Trip Modal */}
      {editingTrip && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setEditingTrip(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Fermer</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Modifier le voyage</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Mettez à jour les informations du voyage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Nom du voyage</label>
                    <input
                      type="text"
                      name="name"
                      id="edit-name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingTrip.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      id="edit-description"
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingTrip.description || ''}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-departureLocation" className="block text-sm font-medium text-gray-700">Lieu de départ</label>
                      <input
                        type="text"
                        name="departureLocation"
                        id="edit-departureLocation"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.departureLocation}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit-destination" className="block text-sm font-medium text-gray-700">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        id="edit-destination"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.destination}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit-departureDate" className="block text-sm font-medium text-gray-700">Date de départ</label>
                      <input
                        type="date"
                        name="departureDate"
                        id="edit-departureDate"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.departureDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit-departureTime" className="block text-sm font-medium text-gray-700">Heure de départ</label>
                      <input
                        type="time"
                        name="departureTime"
                        id="edit-departureTime"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.departureTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit-returnDate" className="block text-sm font-medium text-gray-700">Date de retour</label>
                      <input
                        type="date"
                        name="returnDate"
                        id="edit-returnDate"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.returnDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit-returnTime" className="block text-sm font-medium text-gray-700">Heure de retour</label>
                      <input
                        type="time"
                        name="returnTime"
                        id="edit-returnTime"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.returnTime || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit-passengerCount" className="block text-sm font-medium text-gray-700">Nombre de passagers</label>
                      <input
                        type="number"
                        name="passengerCount"
                        id="edit-passengerCount"
                        min="1"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.passengerCount}
                        onChange={(e) => {
                          setEditingTrip({
                            ...editingTrip,
                            passengerCount: parseInt(e.target.value)
                          });
                        }}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">Statut</label>
                      <select
                        name="status"
                        id="edit-status"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editingTrip.status}
                        onChange={handleInputChange}
                      >
                        <option value="Draft">Brouillon</option>
                        <option value="Pending">En attente</option>
                        <option value="Confirmed">Confirmé</option>
                        <option value="In Progress">En cours</option>
                        <option value="Completed">Terminé</option>
                        <option value="Cancelled">Annulé</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Ressources assignées */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Ressources assignées</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-700">Chauffeur</label>
                          <div className="flex space-x-2">
                            {editingTrip.driver && (
                              <button
                                type="button"
                                onClick={() => handleUnassignDriver(editingTrip.id)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Retirer
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setIsAssignDriverModalOpen(true)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              {editingTrip.driver ? 'Changer' : 'Assigner'}
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-1 border border-gray-200 rounded-md p-3 bg-gray-50">
                          {editingTrip.driver ? (
                            (() => {
                              const driver = getDriverDetails(editingTrip.driver);
                              return driver ? (
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <User className="h-6 w-6 text-gray-400" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{driver.firstName} {driver.lastName}</p>
                                    <p className="text-xs text-gray-500">{driver.licenseType} • {driver.experienceYears} ans d'exp.</p>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Chauffeur non trouvé</p>
                              );
                            })()
                          ) : (
                            <p className="text-sm text-gray-500">Aucun chauffeur assigné</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-700">Véhicule</label>
                          <div className="flex space-x-2">
                            {editingTrip.vehicle && (
                              <button
                                type="button"
                                onClick={() => handleUnassignVehicle(editingTrip.id)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Retirer
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setIsAssignVehicleModalOpen(true)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              {editingTrip.vehicle ? 'Changer' : 'Assigner'}
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-1 border border-gray-200 rounded-md p-3 bg-gray-50">
                          {editingTrip.vehicle ? (
                            (() => {
                              const vehicle = getVehicleDetails(editingTrip.vehicle);
                              return vehicle ? (
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <Car className="h-6 w-6 text-gray-400" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{vehicle.name}</p>
                                    <p className="text-xs text-gray-500">{vehicle.licensePlate} • {vehicle.capacity} places</p>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Véhicule non trouvé</p>
                              );
                            })()
                          ) : (
                            <p className="text-sm text-gray-500">Aucun véhicule assigné</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Enregistrer les modifications
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setEditingTrip(null)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Trip Detail Modal */}
      {selectedTripId && !editingTrip && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedTripId(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Fermer</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {(() => {
                const trip = trips.find(t => t.id === selectedTripId);
                if (!trip) return null;
                
                const driver = trip.driver ? getDriverDetails(trip.driver) : null;
                const vehicle = trip.vehicle ? getVehicleDetails(trip.vehicle) : null;
                
                return (
                  <div>
                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Détails du voyage</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(trip.status)}`}>
                          {trip.status}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">{trip.name}</h2>
                      {trip.description && (
                        <p className="text-sm text-gray-600 mb-4">{trip.description}</p>
                      )}
                      
                      <div className="border-t border-b border-gray-200 py-4 my-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Date de départ</div>
                            <div className="mt-1 text-sm text-gray-900">{trip.departureDate} à {trip.departureTime}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Date de retour</div>
                            <div className="mt-1 text-sm text-gray-900">{trip.returnDate}{trip.returnTime ? ` à ${trip.returnTime}` : ''}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Départ</div>
                            <div className="mt-1 text-sm text-gray-900">{trip.departureLocation}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Destination</div>
                            <div className="mt-1 text-sm text-gray-900">{trip.destination}</div>
                          </div>
                          {trip.intermediateStops && trip.intermediateStops.length > 0 && (
                            <div className="col-span-2">
                              <div className="text-sm font-medium text-gray-500">Arrêts intermédiaires</div>
                              <div className="mt-1 text-sm text-gray-900">{trip.intermediateStops.join(', ')}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-500">Nombre de passagers</div>
                            <div className="mt-1 text-sm text-gray-900">{trip.passengerCount} passagers</div>
                          </div>
                          {trip.estimatedDistance && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Distance estimée</div>
                              <div className="mt-1 text-sm text-gray-900">{trip.estimatedDistance} km</div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Ressources assignées */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Ressources assignées</h4>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium text-gray-600">Chauffeur</div>
                              {!driver && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsAssignDriverModalOpen(true);
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Assigner un chauffeur
                                </button>
                              )}
                            </div>
                            {driver ? (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <User className="h-8 w-8 text-gray-400" />
                                  </div>
                                  <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">{driver.firstName} {driver.lastName}</p>
                                    <p className="text-xs text-gray-500">{driver.email} • {driver.phone}</p>
                                    <div className="flex items-center mt-1">
                                      <div className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                                        Permis {driver.licenseType}
                                      </div>
                                      <div className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full ml-2">
                                        {driver.experienceYears} ans d'exp.
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleUnassignDriver(trip.id);
                                    }}
                                    className="ml-2 text-red-600 hover:text-red-800"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-yellow-50 p-3 rounded-lg">
                                <div className="flex items-center text-yellow-800">
                                  <p className="text-sm">Aucun chauffeur assigné à ce voyage</p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium text-gray-600">Véhicule</div>
                              {!vehicle && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsAssignVehicleModalOpen(true);
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Assigner un véhicule
                                </button>
                              )}
                            </div>
                            {vehicle ? (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <Car className="h-8 w-8 text-gray-400" />
                                  </div>
                                  <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">{vehicle.name}</p>
                                    <p className="text-xs text-gray-500">{vehicle.brand} {vehicle.model} • {vehicle.licensePlate}</p>
                                    <div className="flex items-center mt-1">
                                      <div className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                                        {vehicle.capacity} places
                                      </div>
                                      <div className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full ml-2">
                                        {vehicle.type}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleUnassignVehicle(trip.id);
                                    }}
                                    className="ml-2 text-red-600 hover:text-red-800"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-yellow-50 p-3 rounded-lg">
                                <div className="flex items-center text-yellow-800">
                                  <p className="text-sm">Aucun véhicule assigné à ce voyage</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Services additionnels */}
                      {trip.services && trip.services.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Services inclus</h4>
                          <div className="flex flex-wrap">
                            {trip.services.map((service, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                          onClick={() => setSelectedTripId(null)}
                        >
                          Fermer
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                          onClick={() => setEditingTrip(trip)}
                        >
                          Modifier
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      
      {/* Assign Driver Modal */}
      {isAssignDriverModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsAssignDriverModalOpen(false);
                    setSelectedDriverId(null);
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Fermer</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Assigner un chauffeur</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Sélectionnez un chauffeur disponible pour l'assigner à ce voyage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                {availableDrivers.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {availableDrivers.map((driver) => (
                      <div 
                        key={driver.id} 
                        className={`p-4 flex items-center hover:bg-gray-50 cursor-pointer ${
                          selectedDriverId === driver.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedDriverId(driver.id)}
                      >
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{driver.firstName} {driver.lastName}</h4>
                          <p className="text-sm text-gray-500">
                            Permis {driver.licenseType} • {driver.experienceYears} ans d'exp. • {driver.rating} étoiles
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {selectedDriverId === driver.id ? (
                            <Check className="h-5 w-5 text-blue-600" />
                          ) : (
                            <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <User className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Aucun chauffeur disponible</h3>
                    <p className="text-sm text-gray-500">
                      Tous les chauffeurs sont actuellement assignés à d'autres voyages ou ne sont pas disponibles.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAssignDriver}
                  disabled={!selectedDriverId || availableDrivers.length === 0}
                >
                  Assigner
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setIsAssignDriverModalOpen(false);
                    setSelectedDriverId(null);
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Assign Vehicle Modal */}
      {isAssignVehicleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsAssignVehicleModalOpen(false);
                    setSelectedVehicleId(null);
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Fermer</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Assigner un véhicule</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Sélectionnez un véhicule disponible pour l'assigner à ce voyage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                {(() => {
                  const trip = trips.find(t => t.id === selectedTripId);
                  const suitableVehicles = trip 
                    ? availableVehicles.filter(v => v.capacity >= trip.passengerCount)
                    : [];
                  
                  if (suitableVehicles.length > 0) {
                    return (
                      <div className="divide-y divide-gray-200">
                        {suitableVehicles.map((vehicle) => (
                          <div 
                            key={vehicle.id} 
                            className={`p-4 flex items-center hover:bg-gray-50 cursor-pointer ${
                              selectedVehicleId === vehicle.id ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => setSelectedVehicleId(vehicle.id)}
                          >
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                              <Car className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{vehicle.name}</h4>
                              <p className="text-sm text-gray-500">
                                {vehicle.brand} {vehicle.model} • {vehicle.capacity} places • {vehicle.licensePlate}
                              </p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              {selectedVehicleId === vehicle.id ? (
                                <Check className="h-5 w-5 text-blue-600" />
                              ) : (
                                <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  } else if (availableVehicles.length > 0) {
                    return (
                      <div className="p-4 text-center">
                        <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                          <Car className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Aucun véhicule adapté disponible</h3>
                        <p className="text-sm text-gray-500">
                          Il y a des véhicules disponibles, mais aucun n'a la capacité suffisante pour {trip?.passengerCount} passagers.
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div className="p-4 text-center">
                        <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                          <Car className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Aucun véhicule disponible</h3>
                        <p className="text-sm text-gray-500">
                          Tous les véhicules sont actuellement assignés à d'autres voyages ou ne sont pas disponibles.
                        </p>
                      </div>
                    );
                  }
                })()}
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAssignVehicle}
                  disabled={!selectedVehicleId}
                >
                  Assigner
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setIsAssignVehicleModalOpen(false);
                    setSelectedVehicleId(null);
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TripPlanningPage;