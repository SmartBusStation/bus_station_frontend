"use client";

import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, ChevronDown, Plus, User, Mail, Phone, MapPin, Briefcase, Package, Star, Edit, Trash2, Grid, List } from 'lucide-react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { useResourceContext, Traveler } from '@/context/ResourceContext';

const TravelersPage = () => {
  const { travelers, deleteTraveler, updateTraveler, addTraveler } = useResourceContext();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTraveler, setSelectedTraveler] = useState<number | null>(null);
  const [editingTraveler, setEditingTraveler] = useState<Traveler | null>(null);
  const [isAddTravelerModalOpen, setIsAddTravelerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [newTraveler, setNewTraveler] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    job: '',
    packages: '',
    memberCategory: ''
  });

  // Filter travelers based on filters
  const filteredTravelers = travelers.filter(traveler => {
    // Filter by search query
    if (searchQuery && !traveler.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !traveler.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by package
    if (selectedPackage && !traveler.packages.includes(selectedPackage)) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory && traveler.memberCategory !== selectedCategory) {
      return false;
    }
    
    return true;
  });

  const memberCategoryColors = {
    'Gold': 'bg-amber-100 text-amber-800 border-amber-200',
    'Silver': 'bg-gray-100 text-gray-800 border-gray-200',
    'Bronze': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  // Handle form input changes for adding/editing a traveler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingTraveler) {
      setEditingTraveler({ ...editingTraveler, [name]: value });
    } else {
      setNewTraveler({ ...newTraveler, [name]: value });
    }
  };

  // Handle adding a new traveler
  const handleAddTraveler = () => {
    addTraveler({
      name: newTraveler.name,
      email: newTraveler.email,
      phone: newTraveler.phone,
      address: newTraveler.address,
      job: newTraveler.job,
      packages: newTraveler.packages ? newTraveler.packages.split(',').map(pkg => pkg.trim()) : [],
      memberCategory: newTraveler.memberCategory
    });
    
    // Reset form and close modal
    setNewTraveler({
      name: '',
      email: '',
      phone: '',
      address: '',
      job: '',
      packages: '',
      memberCategory: ''
    });
    setIsAddTravelerModalOpen(false);
  };

  // Handle saving edited traveler
  const handleSaveEdit = () => {
    if (editingTraveler) {
      updateTraveler(editingTraveler.id, editingTraveler);
      setEditingTraveler(null);
    }
  };

  // Handle deleting a traveler
  const handleDeleteTraveler = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this traveler?')) {
      deleteTraveler(id);
      if (selectedTraveler === id) {
        setSelectedTraveler(null);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Travelers</h1>
            <p className="text-gray-500 mt-1">Manage your travelers and their profiles</p>
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
              onClick={() => setIsAddTravelerModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Traveler
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search name, email, address, job, etc."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select 
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedPackage || ''}
                onChange={(e) => setSelectedPackage(e.target.value || null)}
              >
                <option value="">Package ↓</option>
                <option value="Venice Dreams">Venice Dreams</option>
                <option value="Safari Adventure">Safari Adventure</option>
                <option value="Alpine Escape">Alpine Escape</option>
                <option value="Caribbean Cruise">Caribbean Cruise</option>
                <option value="Tokyo Cultural Adventure">Tokyo Cultural Adventure</option>
                <option value="Greek Island Hopping">Greek Island Hopping</option>
                <option value="Bali Beach Escape">Bali Beach Escape</option>
                <option value="Parisian Romance">Parisian Romance</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <select 
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Member Category ↓</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTravelers.map((traveler) => (
              <div 
                key={traveler.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTraveler(traveler.id)}
              >
                <div className="p-5">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{traveler.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Mail className="h-3.5 w-3.5 mr-1" />
                          <span className="truncate w-40">{traveler.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 h-6 text-xs font-medium rounded-full ${
                      traveler.memberCategory === 'Gold' 
                        ? 'bg-amber-100 text-amber-800' 
                        : traveler.memberCategory === 'Silver' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-orange-100 text-orange-800'
                    }`}>
                      {traveler.memberCategory}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                      <span className="text-gray-600">{traveler.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                      <span className="text-gray-600">{traveler.address}</span>
                    </div>
                    <div className="flex items-start">
                      <Briefcase className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                      <span className="text-gray-600">{traveler.job}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Packages</h4>
                    <div className="flex flex-wrap gap-1">
                      {traveler.packages.slice(0, 2).map((pkg, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {pkg}
                        </span>
                      ))}
                      {traveler.packages.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{traveler.packages.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500">ID: {traveler.id}</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTraveler(traveler);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      onClick={(e) => handleDeleteTraveler(traveler.id, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                      Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Field
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Packages
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member Category
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredTravelers.map((traveler) => (
                    <tr 
                      key={traveler.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${selectedTraveler === traveler.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedTraveler(traveler.id)}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{traveler.name}</div>
                            <div className="text-sm text-gray-500">{traveler.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {traveler.phone}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {traveler.address}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {traveler.job}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-col space-y-1">
                          {traveler.packages.map((pkg, index) => (
                            <span key={index}>{pkg}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          traveler.memberCategory === 'Gold' 
                            ? 'bg-amber-100 text-amber-800' 
                            : traveler.memberCategory === 'Silver' 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-orange-100 text-orange-800'
                        }`}>
                          {traveler.memberCategory}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTraveler(traveler);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={(e) => handleDeleteTraveler(traveler.id, e)}
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
            
            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredTravelers.length}</span> out of <span className="font-medium">{travelers.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded-md text-gray-600 hover:bg-gray-100">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="h-8 w-8 text-sm flex items-center justify-center rounded-md bg-blue-600 text-white">
                  1
                </button>
                <button className="p-1 rounded-md text-gray-600 hover:bg-gray-100">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* No results message */}
        {filteredTravelers.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No travelers found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              onClick={() => {
                setSearchQuery('');
                setSelectedPackage(null);
                setSelectedCategory(null);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Add Traveler Modal */}
      {isAddTravelerModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddTravelerModalOpen(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Traveler</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Fill in the information below to add a new traveler to your system.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newTraveler.name}
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
                      value={newTraveler.email}
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
                      value={newTraveler.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newTraveler.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="job" className="block text-sm font-medium text-gray-700">Job Field</label>
                    <input
                      type="text"
                      name="job"
                      id="job"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newTraveler.job}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="memberCategory" className="block text-sm font-medium text-gray-700">Member Category</label>
                    <select
                      name="memberCategory"
                      id="memberCategory"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newTraveler.memberCategory}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a category</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="packages" className="block text-sm font-medium text-gray-700">
                    Packages (comma separated)
                  </label>
                  <input
                    type="text"
                    name="packages"
                    id="packages"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Venice Dreams, Safari Adventure, etc."
                    value={newTraveler.packages}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleAddTraveler}
                >
                  Add Traveler
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setIsAddTravelerModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Traveler Modal */}
      {editingTraveler && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setEditingTraveler(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Traveler</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Update the traveler's information below.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingTraveler.name}
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
                      value={editingTraveler.email}
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
                      value={editingTraveler.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingTraveler.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="job" className="block text-sm font-medium text-gray-700">Job Field</label>
                    <input
                      type="text"
                      name="job"
                      id="job"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingTraveler.job}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="memberCategory" className="block text-sm font-medium text-gray-700">Member Category</label>
                    <select
                      name="memberCategory"
                      id="memberCategory"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingTraveler.memberCategory}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a category</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="packages" className="block text-sm font-medium text-gray-700">
                    Packages
                  </label>
                  <input
                    type="text"
                    name="packages"
                    id="packages"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Venice Dreams, Safari Adventure, etc."
                    value={editingTraveler.packages.join(', ')}
                    onChange={(e) => {
                      setEditingTraveler({
                        ...editingTraveler,
                        packages: e.target.value.split(',').map(pkg => pkg.trim())
                      });
                    }}
                  />
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setEditingTraveler(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Traveler Detail Modal */}
      {selectedTraveler && !editingTraveler && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedTraveler(null)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {(() => {
                const traveler = travelers.find(t => t.id === selectedTraveler);
                if (!traveler) return null;
                
                return (
                  <div>
                    <div className="text-center sm:mt-0">
                      <div className="mx-auto h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-500" />
                      </div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">{traveler.name}</h3>
                      <p className="text-sm text-gray-500">{traveler.email}</p>
                      
                      <div className="mt-2">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          memberCategoryColors[traveler.memberCategory as keyof typeof memberCategoryColors]
                        }`}>
                          {traveler.memberCategory} Member
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <dl className="space-y-3">
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500 flex items-center w-1/3">
                            <Phone className="h-4 w-4 mr-2" />
                            Phone
                          </dt>
                          <dd className="text-sm text-gray-900 w-2/3">{traveler.phone}</dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500 flex items-center w-1/3">
                            <MapPin className="h-4 w-4 mr-2" />
                            Address
                          </dt>
                          <dd className="text-sm text-gray-900 w-2/3">{traveler.address}</dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500 flex items-center w-1/3">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Job
                          </dt>
                          <dd className="text-sm text-gray-900 w-2/3">{traveler.job}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Booked Packages
                      </h4>
                      <div className="space-y-2">
                        {traveler.packages.map((pkg, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-800">{pkg}</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <span className="text-sm text-gray-500 ml-1">4.8</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {index === 0 ? 'Jun 25 - Jun 30, 2025' : 'Jul 14 - Jul 20, 2025'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                        onClick={() => setSelectedTraveler(null)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                        onClick={() => setEditingTraveler(traveler)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TravelersPage;