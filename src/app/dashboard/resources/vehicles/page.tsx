"use client";

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Plus, X, Check, Edit, Trash2, MoreHorizontal, Calendar, Clock, FileText, Fuel, Car, Users, Image as ImageIcon, MapPin, PenTool, Grid, List } from 'lucide-react';
import DashboardLayout from '@/app/dashboard/components/layouts/DashboardLayout';
import { useResourceContext, Vehicle } from '@/context/ResourceContext';

const VehiclesPage = () => {
  const { 
    vehicles, 
    trips, 
    addVehicle, 
    updateVehicle, 
    deleteVehicle, 
    assignVehicleToTrip, 
    getUnassignedTrips 
  } = useResourceContext();
  
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState<string | null>(null);
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAssignTripModalOpen, setIsAssignTripModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  
  // New form for adding a vehicle
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    type: '',
    brand: '',
    model: '',
    licensePlate: '',
    year: '',
    capacity: '',
    mileage: '',
    fuelType: '',
    fuelConsumption: '',
    lastMaintenanceDate: '',
    nextMaintenanceDate: '',
    amenities: '',
    location: 'Main Depot'
  });

  // Filter vehicles based on search query and filters
  const filteredVehicles = vehicles.filter(vehicle => {
    // Filter by search query
    if (searchQuery && !vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (vehicleStatusFilter && vehicle.status !== vehicleStatusFilter) {
      return false;
    }
    
    // Filter by type
    if (vehicleTypeFilter && vehicle.type !== vehicleTypeFilter) {
      return false;
    }
    
    return true;
  });

  // Get unassigned trips
  const unassignedTrips = getUnassignedTrips();

  // Generate status badge class based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'On Trip':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-amber-100 text-amber-800';
      case 'Out of Service':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingVehicle) {
      setEditingVehicle({ ...editingVehicle, [name]: value });
    } else {
      setNewVehicle({ ...newVehicle, [name]: value });
    }
  };

  // Handle adding a new vehicle
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create vehicle object from form data
    addVehicle({
      name: newVehicle.name,
      type: newVehicle.type,
      brand: newVehicle.brand,
      model: newVehicle.model,
      licensePlate: newVehicle.licensePlate,
      year: parseInt(newVehicle.year),
      capacity: parseInt(newVehicle.capacity),
      mileage: parseInt(newVehicle.mileage) || 0,
      fuelType: newVehicle.fuelType,
      fuelConsumption: newVehicle.fuelConsumption,
      lastMaintenanceDate: newVehicle.lastMaintenanceDate,
      nextMaintenanceDate: newVehicle.nextMaintenanceDate,
      amenities: newVehicle.amenities ? newVehicle.amenities.split(',').map(amenity => amenity.trim()) : [],
      status: 'Available',
      location: newVehicle.location,
      documents: ['Insurance', 'Technical Inspection']
    });
    
    // Reset form and close modal
    setNewVehicle({
      name: '',
      type: '',
      brand: '',
      model: '',
      licensePlate: '',
      year: '',
      capacity: '',
      mileage: '',
      fuelType: '',
      fuelConsumption: '',
      lastMaintenanceDate: '',
      nextMaintenanceDate: '',
      amenities: '',
      location: 'Main Depot'
    });
    setIsAddVehicleModalOpen(false);
  };

  // Handle saving edited vehicle
  const handleSaveEdit = () => {
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, editingVehicle);
      setEditingVehicle(null);
    }
  };

  // Handle deleting a vehicle
  const handleDeleteVehicle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      deleteVehicle(id);
      if (selectedVehicleId === id) {
        setSelectedVehicleId(null);
      }
    }
  };

  // Handle assigning vehicle to trip
  const handleAssignTrip = () => {
    if (selectedVehicleId && selectedTripId) {
      assignVehicleToTrip(selectedVehicleId, selectedTripId);
      setIsAssignTripModalOpen(false);
      setSelectedTripId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vehicles</h1>
            <p className="text-gray-500 mt-1">Manage your vehicle fleet for trip assignments</p>
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
              onClick={() => setIsAddVehicleModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
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
                placeholder="Search by name, license plate..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <select 
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={vehicleStatusFilter || ''}
                  onChange={(e) => setVehicleStatusFilter(e.target.value || null)}
                >
                  <option value="">Status: All</option>
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              
              <div className="relative">
                <select 
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={vehicleTypeFilter || ''}
                  onChange={(e) => setVehicleTypeFilter(e.target.value || null)}
                >
                  <option value="">Type: All</option>
                  <option value="Bus">Bus</option>
                  <option value="Minibus">Minibus</option>
                  <option value="Van">Van</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vehicles Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVehicles.map((vehicle) => (
              <div 
                key={vehicle.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedVehicleId(vehicle.id)}
              >
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-0 left-0 m-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 m-3">
                    <span className="px-2 py-1 bg-gray-800 bg-opacity-70 text-white text-xs font-medium rounded-lg">
                      {vehicle.capacity} seats
                    </span>
                  </div>
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Car className="h-20 w-20" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{vehicle.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <span className="text-sm text-gray-700 font-medium">{vehicle.brand} {vehicle.model}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{vehicle.year}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mt-2">
                    <Car className="h-4 w-4 mr-1" />
                    <span>{vehicle.licensePlate}</span>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {vehicle.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {vehicle.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        +{vehicle.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {vehicle.status === 'Available' 
                        ? `At ${vehicle.location}` 
                        : vehicle.status === 'On Trip' 
                          ? vehicle.location 
                          : vehicle.status === 'Maintenance' 
                            ? `At ${vehicle.location} until ${vehicle.nextMaintenanceDate}` 
                            : `${vehicle.location} - Unavailable`}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingVehicle(vehicle);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        onClick={(e) => handleDeleteVehicle(vehicle.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Vehicles List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Plate</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredVehicles.map((vehicle) => (
                    <tr 
                      key={vehicle.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedVehicleId(vehicle.id)}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200 flex items-center justify-center">
                            <Car className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                            <div className="text-sm text-gray-500">{vehicle.brand} {vehicle.model} ({vehicle.year})</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.licensePlate}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.capacity} seats
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.type}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(vehicle.status)}`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.location}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingVehicle(vehicle);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={(e) => handleDeleteVehicle(vehicle.id, e)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* No results message */}
        {filteredVehicles.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No vehicles found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              onClick={() => {
                setSearchQuery('');
                setVehicleStatusFilter(null);
                setVehicleTypeFilter(null);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Add Vehicle Modal */}
      {isAddVehicleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddVehicleModalOpen(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Vehicle</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Fill in the information below to add a new vehicle to your fleet.
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleAddVehicle} className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                    <select
                      name="type"
                      id="type"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a type</option>
                      <option value="Bus">Bus</option>
                      <option value="Minibus">Minibus</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.brand}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                      type="text"
                      name="model"
                      id="model"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.model}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">License Plate</label>
                    <input
                      type="text"
                      name="licensePlate"
                      id="licensePlate"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.licensePlate}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="number"
                      name="year"
                      id="year"
                      min="1990"
                      max="2025"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.year}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Passenger Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      id="capacity"
                      min="1"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.capacity}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type</label>
                    <select
                      name="fuelType"
                      id="fuelType"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.fuelType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select fuel type</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="fuelConsumption" className="block text-sm font-medium text-gray-700">Fuel Consumption</label>
                    <input
                      type="text"
                      name="fuelConsumption"
                      id="fuelConsumption"
                      placeholder="e.g. 28 L/100km"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.fuelConsumption}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Current Mileage (km)</label>
                    <input
                      type="number"
                      name="mileage"
                      id="mileage"
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.mileage}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastMaintenanceDate" className="block text-sm font-medium text-gray-700">Last Maintenance Date</label>
                    <input
                      type="date"
                      name="lastMaintenanceDate"
                      id="lastMaintenanceDate"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.lastMaintenanceDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="nextMaintenanceDate" className="block text-sm font-medium text-gray-700">Next Maintenance Date</label>
                    <input
                      type="date"
                      name="nextMaintenanceDate"
                      id="nextMaintenanceDate"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newVehicle.nextMaintenanceDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities (comma separated)</label>
                  <input
                    type="text"
                    name="amenities"
                    id="amenities"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Air Conditioning, WiFi, Restroom..."
                    value={newVehicle.amenities}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mt-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    name="location"
                    id="location"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newVehicle.location}
                    onChange={handleInputChange}
                  >
                    <option value="Main Depot">Main Depot</option>
                    <option value="Eco Depot">Eco Depot</option>
                    <option value="VIP Depot">VIP Depot</option>
                    <option value="Service Center">Service Center</option>
                  </select>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Add Vehicle
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setIsAddVehicleModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Vehicle Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setEditingVehicle(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Vehicle</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Update the vehicle's information below.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                    <select
                      name="type"
                      id="type"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.type}
                      onChange={handleInputChange}
                    >
                      <option value="Bus">Bus</option>
                      <option value="Minibus">Minibus</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.brand}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                      type="text"
                      name="model"
                      id="model"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.model}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">License Plate</label>
                    <input
                      type="text"
                      name="licensePlate"
                      id="licensePlate"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.licensePlate}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Passenger Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      id="capacity"
                      min="1"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.capacity}
                      onChange={(e) => {
                        setEditingVehicle({
                          ...editingVehicle,
                          capacity: parseInt(e.target.value)
                        });
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      id="status"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.status}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="On Trip">On Trip</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Out of Service">Out of Service</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                      name="location"
                      id="location"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingVehicle.location}
                      onChange={handleInputChange}
                    >
                      <option value="Main Depot">Main Depot</option>
                      <option value="Route to Paris">Route to Paris</option>
                      <option value="Route to Rome">Route to Rome</option>
                      <option value="Route to Venice">Route to Venice</option>
                      <option value="Eco Depot">Eco Depot</option>
                      <option value="VIP Depot">VIP Depot</option>
                      <option value="Service Center">Service Center</option>
                      <option value="Repair Shop">Repair Shop</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities (comma separated)</label>
                  <input
                    type="text"
                    name="amenities"
                    id="amenities"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingVehicle.amenities.join(', ')}
                    onChange={(e) => {
                      setEditingVehicle({
                        ...editingVehicle,
                        amenities: e.target.value.split(',').map(amenity => amenity.trim())
                      });
                    }}
                  />
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setEditingVehicle(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Vehicle Detail Modal */}
      {selectedVehicleId && !editingVehicle && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedVehicleId(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {(() => {
                const vehicle = vehicles.find(v => v.id === selectedVehicleId);
                if (!vehicle) return null;
                
                const vehicleTrips = trips.filter(trip => trip.vehicle === vehicle.id);
                
                return (
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Vehicle Details</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </div>
                    
                    <div className="bg-gray-200 h-40 rounded-lg mb-4 flex items-center justify-center">
                      <Car className="h-20 w-20 text-gray-400" />
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">{vehicle.name}</h2>
                    <p className="text-gray-600">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
                    
                    <div className="border-t border-b border-gray-200 py-4 mt-4 mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">License Plate</div>
                          <div className="mt-1 text-sm text-gray-900">{vehicle.licensePlate}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Capacity</div>
                          <div className="mt-1 text-sm text-gray-900">{vehicle.capacity} passengers</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Type</div>
                          <div className="mt-1 text-sm text-gray-900">{vehicle.type}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Mileage</div>
                          <div className="mt-1 text-sm text-gray-900">{vehicle.mileage.toLocaleString()} km</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Fuel Type</div>
                          <div className="mt-1 text-sm text-gray-900">{vehicle.fuelType}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Fuel Consumption</div>
                          <div className="mt-1 text-sm text-gray-900">{vehicle.fuelConsumption}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <PenTool className="h-4 w-4 text-gray-500 mr-2" />
                        <h4 className="text-sm font-medium text-gray-700">Maintenance</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-gray-500">Last Maintenance</div>
                          <div className="text-sm text-gray-900">{vehicle.lastMaintenanceDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Next Maintenance</div>
                          <div className="text-sm text-gray-900">{vehicle.nextMaintenanceDate}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Check className="h-4 w-4 text-gray-500 mr-2" />
                        <h4 className="text-sm font-medium text-gray-700">Amenities</h4>
                      </div>
                      <div className="flex flex-wrap">
                        {vehicle.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <h4 className="text-sm font-medium text-gray-700">Documents</h4>
                      </div>
                      <div className="flex flex-wrap">
                        {vehicle.documents.map((doc, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <h4 className="text-sm font-medium text-gray-700">Current Location</h4>
                      </div>
                      <div className="text-sm text-gray-900">{vehicle.location}</div>
                    </div>
                    
                    {/* Assigned Trips */}
                    {vehicleTrips.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <h4 className="text-sm font-medium text-gray-700">Assigned Trips</h4>
                        </div>
                        <div className="space-y-2">
                          {vehicleTrips.map((trip) => (
                            <div key={trip.id} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-800">{trip.name}</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(trip.status)}`}>
                                  {trip.status}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {trip.departureDate} at {trip.departureTime} • {trip.passengerCount} passengers
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex mt-5 sm:mt-6 space-x-3">
                      {vehicle.status === 'Available' && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                          onClick={() => setIsAssignTripModalOpen(true)}
                        >
                          Assign to Trip
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        onClick={() => setSelectedVehicleId(null)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                        onClick={() => setEditingVehicle(vehicle)}
                      >
                        Edit Vehicle
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      
      {/* Assign to Trip Modal */}
      {isAssignTripModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsAssignTripModalOpen(false);
                    setSelectedTripId(null);
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Assign Vehicle to Trip</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select a trip to assign this vehicle to.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                {unassignedTrips.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {unassignedTrips.map((trip) => {
                      // Filter trips based on vehicle capacity
                      const vehicle = vehicles.find(v => v.id === selectedVehicleId);
                      const hasEnoughCapacity = vehicle && vehicle.capacity >= trip.passengerCount;
                      
                      // Only show trips where vehicle has enough capacity
                      if (!hasEnoughCapacity) return null;
                      
                      return (
                        <div 
                          key={trip.id} 
                          className={`p-4 flex items-center hover:bg-gray-50 cursor-pointer ${
                            selectedTripId === trip.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedTripId(trip.id)}
                        >
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{trip.name}</h4>
                            <p className="text-sm text-gray-500">
                              {trip.departureDate} • {trip.departureTime} • {trip.passengerCount} passengers
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {selectedTripId === trip.id ? (
                              <Check className="h-5 w-5 text-blue-600" />
                            ) : (
                              <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No unassigned trips available.
                  </div>
                )}
                
                {unassignedTrips.length > 0 && unassignedTrips.every(trip => {
                  const vehicle = vehicles.find(v => v.id === selectedVehicleId);
                  return !(vehicle && vehicle.capacity >= trip.passengerCount);
                }) && (
                  <div className="p-4 text-center text-gray-500">
                    No trips with suitable passenger capacity available.
                  </div>
                )}
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAssignTrip}
                  disabled={!selectedTripId || unassignedTrips.length === 0}
                >
                  Assign to Trip
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setIsAssignTripModalOpen(false);
                    setSelectedTripId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default VehiclesPage;