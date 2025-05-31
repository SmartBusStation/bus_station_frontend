"use client";

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Plus, X, Check, Edit, Trash2, Clock, Calendar, Mail, Phone, User, MoreHorizontal, Star, FileText, Languages, Award } from 'lucide-react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useResourceContext, Driver, Trip } from '@/context/ResourceContext';

const DriversPage = () => {
  const { 
    drivers, 
    trips, 
    addDriver, 
    updateDriver, 
    deleteDriver, 
    assignDriverToTrip, 
    getUnassignedTrips 
  } = useResourceContext();
  
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [driverStatusFilter, setDriverStatusFilter] = useState<string | null>(null);
  const [licenseTypeFilter, setLicenseTypeFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [isAssignTripModalOpen, setIsAssignTripModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // New form for adding a driver
  const [newDriver, setNewDriver] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    licenseType: '',
    licenseExpiry: '',
    experienceYears: '',
    hireDate: '',
    email: '',
    phone: '',
    languages: '',
    certifications: ''
  });

  // Filter drivers based on search query and filters
  const filteredDrivers = drivers.filter(driver => {
    // Filter by search query
    if (searchQuery && !`${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !driver.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (driverStatusFilter && driver.status !== driverStatusFilter) {
      return false;
    }
    
    // Filter by license type
    if (licenseTypeFilter && driver.licenseType !== licenseTypeFilter) {
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
      case 'On Leave':
        return 'bg-amber-100 text-amber-800';
      case 'Maintenance':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingDriver) {
      setEditingDriver({ ...editingDriver, [name]: value });
    } else {
      setNewDriver({ ...newDriver, [name]: value });
    }
  };

  // Handle adding a new driver
  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create driver object from form data
    addDriver({
      firstName: newDriver.firstName,
      lastName: newDriver.lastName,
      photo: undefined,
      age: calculateAge(newDriver.dateOfBirth),
      dateOfBirth: newDriver.dateOfBirth,
      licenseType: newDriver.licenseType,
      licenseExpiry: newDriver.licenseExpiry,
      experienceYears: parseInt(newDriver.experienceYears),
      hireDate: newDriver.hireDate,
      email: newDriver.email,
      phone: newDriver.phone,
      languages: newDriver.languages ? newDriver.languages.split(',').map(lang => lang.trim()) : [],
      certifications: newDriver.certifications ? newDriver.certifications.split(',').map(cert => cert.trim()) : [],
      rating: 0,
      status: 'Available',
      totalTrips: 0,
      currentLocation: 'Garage HQ'
    });
    
    // Reset form and close modal
    setNewDriver({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      licenseType: '',
      licenseExpiry: '',
      experienceYears: '',
      hireDate: '',
      email: '',
      phone: '',
      languages: '',
      certifications: ''
    });
    setIsAddDriverModalOpen(false);
  };

  // Handle saving edited driver
  const handleSaveEdit = () => {
    if (editingDriver) {
      updateDriver(editingDriver.id, editingDriver);
      setEditingDriver(null);
    }
  };

  // Handle deleting a driver
  const handleDeleteDriver = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this driver?')) {
      deleteDriver(id);
      if (selectedDriverId === id) {
        setSelectedDriverId(null);
      }
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle assigning driver to trip
  const handleAssignTrip = () => {
    if (selectedDriverId && selectedTripId) {
      assignDriverToTrip(selectedDriverId, selectedTripId);
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
            <h1 className="text-2xl font-bold text-gray-800">Drivers</h1>
            <p className="text-gray-500 mt-1">Manage your driver fleet and assign to trips</p>
          </div>
          
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm font-medium"
            onClick={() => setIsAddDriverModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Driver
          </button>
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
                placeholder="Search by name, email..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <select 
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={driverStatusFilter || ''}
                  onChange={(e) => setDriverStatusFilter(e.target.value || null)}
                >
                  <option value="">Status: All</option>
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              
              <div className="relative">
                <select 
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={licenseTypeFilter || ''}
                  onChange={(e) => setLicenseTypeFilter(e.target.value || null)}
                >
                  <option value="">License: All</option>
                  <option value="A">Type A</option>
                  <option value="B">Type B</option>
                  <option value="C">Type C</option>
                  <option value="D">Type D</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Driver Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDrivers.map((driver) => (
            <div 
              key={driver.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedDriverId(driver.id)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{`${driver.firstName} ${driver.lastName}`}</h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        <span className="truncate w-40">{driver.email}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(driver.status)}`}>
                    {driver.status}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">License Type</span>
                    <span className="text-sm font-medium">{driver.licenseType}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Experience</span>
                    <span className="text-sm font-medium">{driver.experienceYears} years</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Total Trips</span>
                    <span className="text-sm font-medium">{driver.totalTrips}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium ml-1">{driver.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <div className="text-xs text-gray-500">
                    {driver.status === 'Available' 
                      ? 'Available for assignment' 
                      : driver.status === 'On Trip' 
                        ? `Currently on route to ${driver.currentLocation.replace('Route to ', '')}` 
                        : driver.status === 'On Leave' 
                          ? 'On scheduled leave' 
                          : 'Attending training/maintenance'}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">ID: {driver.id}</span>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingDriver(driver);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    onClick={(e) => handleDeleteDriver(driver.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No results message */}
        {filteredDrivers.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No drivers found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              onClick={() => {
                setSearchQuery('');
                setDriverStatusFilter(null);
                setLicenseTypeFilter(null);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Add Driver Modal */}
      {isAddDriverModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddDriverModalOpen(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Driver</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Fill in the information below to add a new driver to your fleet.
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleAddDriver} className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700">License Type</label>
                    <select
                      name="licenseType"
                      id="licenseType"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.licenseType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a license type</option>
                      <option value="A">Type A</option>
                      <option value="B">Type B</option>
                      <option value="C">Type C</option>
                      <option value="D">Type D</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="licenseExpiry" className="block text-sm font-medium text-gray-700">License Expiry Date</label>
                    <input
                      type="date"
                      name="licenseExpiry"
                      id="licenseExpiry"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.licenseExpiry}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <input
                      type="number"
                      name="experienceYears"
                      id="experienceYears"
                      min="0"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.experienceYears}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">Hire Date</label>
                    <input
                      type="date"
                      name="hireDate"
                      id="hireDate"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.hireDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newDriver.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Languages (comma separated)</label>
                  <input
                    type="text"
                    name="languages"
                    id="languages"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="English, French, Spanish..."
                    value={newDriver.languages}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mt-4">
                  <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Certifications (comma separated)</label>
                  <input
                    type="text"
                    name="certifications"
                    id="certifications"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="First Aid, Mountain Driving..."
                    value={newDriver.certifications}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Add Driver
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setIsAddDriverModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Driver Modal */}
      {editingDriver && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setEditingDriver(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Driver</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Update the driver's information below.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.dateOfBirth}
                      onChange={(e) => {
                        const newDateOfBirth = e.target.value;
                        setEditingDriver({
                          ...editingDriver,
                          dateOfBirth: newDateOfBirth,
                          age: calculateAge(newDateOfBirth)
                        });
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700">License Type</label>
                    <select
                      name="licenseType"
                      id="licenseType"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.licenseType}
                      onChange={handleInputChange}
                    >
                      <option value="A">Type A</option>
                      <option value="B">Type B</option>
                      <option value="C">Type C</option>
                      <option value="D">Type D</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="licenseExpiry" className="block text-sm font-medium text-gray-700">License Expiry Date</label>
                    <input
                      type="date"
                      name="licenseExpiry"
                      id="licenseExpiry"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.licenseExpiry}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <input
                      type="number"
                      name="experienceYears"
                      id="experienceYears"
                      min="0"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.experienceYears}
                      onChange={(e) => {
                        setEditingDriver({
                          ...editingDriver,
                          experienceYears: parseInt(e.target.value)
                        });
                      }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      id="status"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDriver.status}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="On Trip">On Trip</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Languages (comma separated)</label>
                  <input
                    type="text"
                    name="languages"
                    id="languages"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingDriver.languages.join(', ')}
                    onChange={(e) => {
                      setEditingDriver({
                        ...editingDriver,
                        languages: e.target.value.split(',').map(lang => lang.trim())
                      });
                    }}
                  />
                </div>
                
                <div className="mt-4">
                  <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Certifications (comma separated)</label>
                  <input
                    type="text"
                    name="certifications"
                    id="certifications"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingDriver.certifications.join(', ')}
                    onChange={(e) => {
                      setEditingDriver({
                        ...editingDriver,
                        certifications: e.target.value.split(',').map(cert => cert.trim())
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
                  onClick={() => setEditingDriver(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Driver Detail Modal */}
      {selectedDriverId && !editingDriver && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedDriverId(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {(() => {
                const driver = drivers.find(d => d.id === selectedDriverId);
                if (!driver) return null;
                
                const driverTrips = trips.filter(trip => trip.driver === driver.id);
                
                return (
                  <div>
                    <div className="text-center sm:text-left">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Driver Details</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(driver.status)}`}>
                          {driver.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <User className="h-8 w-8 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <h2 className="text-xl font-semibold text-gray-800">{`${driver.firstName} ${driver.lastName}`}</h2>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Mail className="h-3 w-3 mr-1" />
                              <span>{driver.email}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              <span>{driver.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-b border-gray-200 py-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">License Type</div>
                            <div className="mt-1 text-sm text-gray-900">Type {driver.licenseType}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">License Expiry</div>
                            <div className="mt-1 text-sm text-gray-900">{driver.licenseExpiry}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Date of Birth</div>
                            <div className="mt-1 text-sm text-gray-900">{driver.dateOfBirth} ({driver.age} years)</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Experience</div>
                            <div className="mt-1 text-sm text-gray-900">{driver.experienceYears} years</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Hire Date</div>
                            <div className="mt-1 text-sm text-gray-900">{driver.hireDate}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Rating</div>
                            <div className="mt-1 flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-sm text-gray-900">{driver.rating} / 5.0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Languages className="h-4 w-4 text-gray-500 mr-2" />
                          <h4 className="text-sm font-medium text-gray-700">Languages</h4>
                        </div>
                        <div className="flex flex-wrap">
                          {driver.languages.map((language, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Award className="h-4 w-4 text-gray-500 mr-2" />
                          <h4 className="text-sm font-medium text-gray-700">Certifications</h4>
                        </div>
                        <div className="flex flex-wrap">
                          {driver.certifications.map((cert, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Assigned Trips */}
                      {driverTrips.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <h4 className="text-sm font-medium text-gray-700">Assigned Trips</h4>
                          </div>
                          <div className="space-y-2">
                            {driverTrips.map((trip) => (
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
                        {driver.status === 'Available' && (
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
                          onClick={() => setSelectedDriverId(null)}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                          onClick={() => setEditingDriver(driver)}
                        >
                          Edit Driver
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Assign Driver to Trip</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select a trip to assign this driver to.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                {unassignedTrips.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {unassignedTrips.map((trip) => (
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
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No unassigned trips available.
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

export default DriversPage;