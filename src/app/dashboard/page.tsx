"use client";

import React from 'react';
import { BarChart, ArrowUpRight, ArrowDownRight, Users, DollarSign, Package, PieChart } from 'lucide-react';
import DashboardLayout from './components/layouts/DashboardLayout';
import RevenueOverview from './components/sections/dashboard/RevenueOverview';
import TopDestinations from './components/sections/dashboard/TopDestinations';
import UpcomingTrips from './components/sections/dashboard/UpcomingTrips';
import RecentActivity from './components/sections/dashboard/RecentActivity';
import StatCard from './components/ui/cards/StatCard';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,200',
      icon: <Package className="h-6 w-6 text-blue-600" />,
      change: '+2.8%',
      trend: 'up',
      chartColor: 'blue',
    },
    {
      title: 'Total New Customers',
      value: '2,845',
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      change: '-1.4%',
      trend: 'down',
      chartColor: 'emerald',
    },
    {
      title: 'Total Earnings',
      value: '$12,890',
      icon: <DollarSign className="h-6 w-6 text-amber-600" />,
      change: '+3.75%',
      trend: 'up',
      chartColor: 'amber',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              trend={stat.trend as 'up' | 'down'}
              chartColor={stat.chartColor as 'blue' | 'emerald' | 'amber' | 'red'}
            />
          ))}
        </div>

        {/* Revenue Overview & Top Destinations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RevenueOverview />
          <TopDestinations />
        </div>

        {/* Trips Overview & Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Trip Status</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Last 12 Months</button>
              </div>
              <div className="flex items-center justify-around text-center mb-4 pb-5 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">1,200</h3>
                  <span className="text-sm text-gray-500">Total Trips</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-600">620</h3>
                  <span className="text-sm text-gray-500">Done</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-amber-500">465</h3>
                  <span className="text-sm text-gray-500">Booked</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-red-500">115</h3>
                  <span className="text-sm text-gray-500">Cancelled</span>
                </div>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-green-500 h-full" style={{ width: '52%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '39%' }}></div>
                  <div className="bg-red-400 h-full" style={{ width: '9%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white p-5 rounded-xl shadow-sm h-full">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((message) => (
                  <div key={message} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-800 truncate">{["Europa Hotel", "Global Travel", "Kalendra Umboro", "Osman Farooq"][message - 1]}</p>
                        <span className="text-xs text-gray-500">{["9:05 AM", "2:00 PM", "8:45 AM", "6:15 AM"][message - 1]}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {[
                          "We are pleased to announce our new partnership...",
                          "We have updated our commission rates for the upcoming quarter...",
                          "Hi, I need assistance with changing my travel dates for the Tokyo Cultural Adventure...",
                          "Got it, thank you! I'll review the details and get back to you soon..."
                        ][message - 1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Travel Packages */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Travel Packages</h2>
            <div className="flex space-x-2">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md">Top Rated</button>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md">Latest</button>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-3 py-1 rounded-md">View All</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Seoul, South Korea', days: '10 Days', price: '$2,100' },
              { title: 'Venice, Italy', days: '8 Days', price: '$1,500' },
              { title: 'Serengeti, Tanzania', days: '8 Days', price: '$3,200' }
            ].map((pkg, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <div className="h-48 bg-gray-200 rounded-xl"></div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-semibold text-gray-800">{pkg.title}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-amber-500">★</span>
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <span>⌛ {pkg.days} / 7 Nights</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-sm text-gray-500">from</span>
                      <span className="text-lg font-semibold text-blue-600 ml-1">{pkg.price}</span>
                      <span className="text-sm text-gray-500">per person</span>
                    </div>
                    <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[
                    { name: 'Camelia Swan', package: 'Venice Dreams', duration: '8D/7N', date: 'Jun 25 - Jun 30', price: '$1,500', status: 'Confirmed' },
                    { name: 'Raphael Goodman', package: 'Safari Adventure', duration: '8D/7N', date: 'Jun 25 - Jul 2', price: '$3,200', status: 'Pending' },
                    { name: 'Ludwig Contessa', package: 'Alpine Escape', duration: '7D/6N', date: 'Jun 26 - Jul 2', price: '$2,100', status: 'Confirmed' },
                    { name: 'Armina Raul Meyes', package: 'Caribbean Cruise', duration: '10D/9N', date: 'Jun 26 - Jul 5', price: '$2,800', status: 'Cancelled' },
                    { name: 'James Dunn', package: 'Parisian Romance', duration: '5D/4N', date: 'Jun 28 - Jun 30', price: '$1,200', status: 'Confirmed' }
                  ].map((booking, index) => (
                    <tr key={index}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{booking.name}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{booking.package}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{booking.duration}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{booking.price}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;


// // 'use client'
// // import React, { useState, useCallback } from 'react';
// // import { Calculator, Plus, Minus, Play, RotateCcw, BookOpen, Lightbulb } from 'lucide-react';

// // const SimplexSolver = () => {
// //   const [numVariables, setNumVariables] = useState(2);
// //   const [numConstraints, setNumConstraints] = useState(2);
// //   const [objective, setObjective] = useState([1, 1]);
// //   const [constraints, setConstraints] = useState([[1, 1], [2, 1]]);
// //   const [rhs, setRhs] = useState([4, 6]);
// //   const [isMaximization, setIsMaximization] = useState(true);
// //   const [solution, setSolution] = useState(null);
// //   const [steps, setSteps] = useState([]);
// //   const [showSteps, setShowSteps] = useState(false);

// //   // Classe pour résoudre le simplexe
// //   class SimplexSolver {
// //     constructor(c, A, b, isMax = true) {
// //       this.c = isMax ? c.map(x => -x) : [...c]; // Convertir en minimisation
// //       this.A = A.map(row => [...row]);
// //       this.b = [...b];
// //       this.isMax = isMax;
// //       this.numVars = c.length;
// //       this.numConstraints = b.length;
// //       this.steps = [];
// //       this.tableau = [];
// //       this.basicVars = [];
// //     }

// //     solve() {
// //       try {
// //         this.setupInitialTableau();
// //         this.steps.push({
// //           type: 'initial',
// //           message: 'Tableau initial du simplexe',
// //           tableau: this.copyTableau()
// //         });

// //         let iteration = 0;
// //         const maxIterations = 50;

// //         while (!this.isOptimal() && iteration < maxIterations) {
// //           iteration++;
          
// //           const enteringVar = this.findEnteringVariable();
// //           if (enteringVar === -1) break;

// //           const leavingVar = this.findLeavingVariable(enteringVar);
// //           if (leavingVar === -1) {
// //             this.steps.push({
// //               type: 'unbounded',
// //               message: 'Le problème n\'a pas de solution bornée (non borné)'
// //             });
// //             return { status: 'unbounded', steps: this.steps };
// //           }

// //           this.pivot(leavingVar, enteringVar);
// //           this.basicVars[leavingVar] = enteringVar;

// //           this.steps.push({
// //             type: 'iteration',
// //             message: `Itération ${iteration}: Variable x${enteringVar + 1} entre, variable de base ${leavingVar + 1} sort`,
// //             tableau: this.copyTableau(),
// //             entering: enteringVar,
// //             leaving: leavingVar
// //           });
// //         }

// //         if (iteration >= maxIterations) {
// //           return { status: 'max_iterations', steps: this.steps };
// //         }

// //         const result = this.extractSolution();
// //         this.steps.push({
// //           type: 'optimal',
// //           message: 'Solution optimale trouvée',
// //           solution: result
// //         });

// //         return { status: 'optimal', solution: result, steps: this.steps };
// //       } catch (error) {
// //         return { 
// //           status: 'error', 
// //           message: error.message,
// //           steps: this.steps 
// //         };
// //       }
// //     }

// //     setupInitialTableau() {
// //       const rows = this.numConstraints + 1;
// //       const cols = this.numVars + this.numConstraints + 1;
      
// //       this.tableau = Array(rows).fill().map(() => Array(cols).fill(0));
      
// //       // Variables de base (variables d'écart)
// //       this.basicVars = Array(this.numConstraints).fill().map((_, i) => this.numVars + i);
      
// //       // Contraintes
// //       for (let i = 0; i < this.numConstraints; i++) {
// //         for (let j = 0; j < this.numVars; j++) {
// //           this.tableau[i][j] = this.A[i][j];
// //         }
// //         this.tableau[i][this.numVars + i] = 1; // Variable d'écart
// //         this.tableau[i][cols - 1] = this.b[i]; // RHS
// //       }
      
// //       // Fonction objectif
// //       for (let j = 0; j < this.numVars; j++) {
// //         this.tableau[rows - 1][j] = this.c[j];
// //       }
// //     }

// //     isOptimal() {
// //       const lastRow = this.tableau[this.tableau.length - 1];
// //       for (let i = 0; i < lastRow.length - 1; i++) {
// //         if (lastRow[i] < 0) return false;
// //       }
// //       return true;
// //     }

// //     findEnteringVariable() {
// //       const lastRow = this.tableau[this.tableau.length - 1];
// //       let minValue = 0;
// //       let enteringVar = -1;
      
// //       for (let i = 0; i < lastRow.length - 1; i++) {
// //         if (lastRow[i] < minValue) {
// //           minValue = lastRow[i];
// //           enteringVar = i;
// //         }
// //       }
      
// //       return enteringVar;
// //     }

// //     findLeavingVariable(enteringVar) {
// //       let minRatio = Infinity;
// //       let leavingVar = -1;
      
// //       for (let i = 0; i < this.numConstraints; i++) {
// //         const pivot = this.tableau[i][enteringVar];
// //         if (pivot > 0) {
// //           const ratio = this.tableau[i][this.tableau[0].length - 1] / pivot;
// //           if (ratio < minRatio) {
// //             minRatio = ratio;
// //             leavingVar = i;
// //           }
// //         }
// //       }
      
// //       return leavingVar;
// //     }

// //     pivot(pivotRow, pivotCol) {
// //       const pivotElement = this.tableau[pivotRow][pivotCol];
      
// //       // Normaliser la ligne pivot
// //       for (let j = 0; j < this.tableau[pivotRow].length; j++) {
// //         this.tableau[pivotRow][j] /= pivotElement;
// //       }
      
// //       // Éliminer les autres éléments de la colonne pivot
// //       for (let i = 0; i < this.tableau.length; i++) {
// //         if (i !== pivotRow) {
// //           const factor = this.tableau[i][pivotCol];
// //           for (let j = 0; j < this.tableau[i].length; j++) {
// //             this.tableau[i][j] -= factor * this.tableau[pivotRow][j];
// //           }
// //         }
// //       }
// //     }

// //     extractSolution() {
// //       const solution = Array(this.numVars).fill(0);
      
// //       for (let i = 0; i < this.basicVars.length; i++) {
// //         const varIndex = this.basicVars[i];
// //         if (varIndex < this.numVars) {
// //           solution[varIndex] = this.tableau[i][this.tableau[0].length - 1];
// //         }
// //       }
      
// //       const objectiveValue = this.isMax ? 
// //         -this.tableau[this.tableau.length - 1][this.tableau[0].length - 1] :
// //         this.tableau[this.tableau.length - 1][this.tableau[0].length - 1];
      
// //       return {
// //         variables: solution,
// //         objectiveValue: objectiveValue
// //       };
// //     }

// //     copyTableau() {
// //       return this.tableau.map(row => [...row]);
// //     }
// //   }

// //   const updateConstraint = (i, j, value) => {
// //     const newConstraints = [...constraints];
// //     newConstraints[i][j] = parseFloat(value) || 0;
// //     setConstraints(newConstraints);
// //   };

// //   const updateObjective = (i, value) => {
// //     const newObjective = [...objective];
// //     newObjective[i] = parseFloat(value) || 0;
// //     setObjective(newObjective);
// //   };

// //   const updateRHS = (i, value) => {
// //     const newRHS = [...rhs];
// //     newRHS[i] = parseFloat(value) || 0;
// //     setRhs(newRHS);
// //   };

// //   const addConstraint = () => {
// //     setNumConstraints(prev => {
// //       const newNum = prev + 1;
// //       setConstraints(prev => [...prev, Array(numVariables).fill(0)]);
// //       setRhs(prev => [...prev, 0]);
// //       return newNum;
// //     });
// //   };

// //   const removeConstraint = () => {
// //     if (numConstraints > 1) {
// //       setNumConstraints(prev => prev - 1);
// //       setConstraints(prev => prev.slice(0, -1));
// //       setRhs(prev => prev.slice(0, -1));
// //     }
// //   };

// //   const addVariable = () => {
// //     setNumVariables(prev => {
// //       const newNum = prev + 1;
// //       setObjective(prev => [...prev, 0]);
// //       setConstraints(prev => prev.map(row => [...row, 0]));
// //       return newNum;
// //     });
// //   };

// //   const removeVariable = () => {
// //     if (numVariables > 2) {
// //       setNumVariables(prev => prev - 1);
// //       setObjective(prev => prev.slice(0, -1));
// //       setConstraints(prev => prev.map(row => row.slice(0, -1)));
// //     }
// //   };

// //   const solveProblem = () => {
// //     const solver = new SimplexSolver(objective, constraints, rhs, isMaximization);
// //     const result = solver.solve();
// //     setSolution(result);
// //     setSteps(result.steps || []);
// //   };

// //   const resetProblem = () => {
// //     setSolution(null);
// //     setSteps([]);
// //     setShowSteps(false);
// //   };

// //   const formatNumber = (num) => {
// //     if (typeof num !== 'number' || isNaN(num)) return '0';
// //     return Math.abs(num) < 1e-10 ? '0' : num.toFixed(3);
// //   };

// //   return (
// //     <>
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
// //       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="></div>

// //       {/*>60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" */}
// //       <div className="relative z-10 container mx-auto px-4 py-8">
// //         <div className="text-center mb-12">
// //           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
// //             <Calculator className="w-8 h-8 text-white" />
// //           </div>
// //           <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
// //             Solveur Simplexe
// //           </h1>
// //           <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
// //             Résolvez vos problèmes de programmation linéaire avec la méthode du simplexe
// //           </p>
// //         </div>

// //         <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
// //           {/* Configuration du problème */}
// //           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
// //             <div className="flex items-center gap-3 mb-8">
// //               <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
// //                 <BookOpen className="w-5 h-5 text-white" />
// //               </div>
// //               <h2 className="text-2xl font-bold text-white">Configuration du Problème</h2>
// //             </div>

// //             {/* Type d'optimisation */}
// //             <div className="mb-8">
// //               <label className="block text-lg font-semibold text-slate-200 mb-4">Type d'optimisation</label>
// //               <div className="flex gap-4">
// //                 <button
// //                   onClick={() => setIsMaximization(true)}
// //                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${isMaximization
// //                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
// //                       : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
// //                 >
// //                   Maximisation
// //                 </button>
// //                 <button
// //                   onClick={() => setIsMaximization(false)}
// //                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${!isMaximization
// //                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
// //                       : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
// //                 >
// //                   Minimisation
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Fonction objectif */}
// //             <div className="mb-8">
// //               <div className="flex items-center justify-between mb-4">
// //                 <label className="text-lg font-semibold text-slate-200">
// //                   Fonction objectif: {isMaximization ? 'Maximiser' : 'Minimiser'} Z =
// //                 </label>
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={addVariable}
// //                     className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors"
// //                   >
// //                     <Plus className="w-4 h-4 text-green-400" />
// //                   </button>
// //                   <button
// //                     onClick={removeVariable}
// //                     disabled={numVariables <= 2}
// //                     className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
// //                   >
// //                     <Minus className="w-4 h-4 text-red-400" />
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="flex flex-wrap gap-3 items-center">
// //                 {objective.map((coef, i) => (
// //                   <div key={i} className="flex items-center gap-2">
// //                     {i > 0 && <span className="text-slate-300 text-lg">+</span>}
// //                     <input
// //                       type="number"
// //                       value={coef}
// //                       onChange={(e) => updateObjective(i, e.target.value)}
// //                       className="w-16 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       step="0.1" />
// //                     <span className="text-slate-300 font-medium">x{i + 1}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Contraintes */}
// //             <div className="mb-8">
// //               <div className="flex items-center justify-between mb-4">
// //                 <label className="text-lg font-semibold text-slate-200">Contraintes</label>
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={addConstraint}
// //                     className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors"
// //                   >
// //                     <Plus className="w-4 h-4 text-green-400" />
// //                   </button>
// //                   <button
// //                     onClick={removeConstraint}
// //                     disabled={numConstraints <= 1}
// //                     className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
// //                   >
// //                     <Minus className="w-4 h-4 text-red-400" />
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="space-y-4">
// //                 {constraints.map((constraint, i) => (
// //                   <div key={i} className="flex flex-wrap gap-3 items-center p-4 bg-white/5 rounded-xl border border-white/10">
// //                     {constraint.map((coef, j) => (
// //                       <div key={j} className="flex items-center gap-2">
// //                         {j > 0 && <span className="text-slate-300">+</span>}
// //                         <input
// //                           type="number"
// //                           value={coef}
// //                           onChange={(e) => updateConstraint(i, j, e.target.value)}
// //                           className="w-16 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                           step="0.1" />
// //                         <span className="text-slate-300 font-medium">x{j + 1}</span>
// //                       </div>
// //                     ))}
// //                     <span className="text-slate-300 mx-2">≤</span>
// //                     <input
// //                       type="number"
// //                       value={rhs[i]}
// //                       onChange={(e) => updateRHS(i, e.target.value)}
// //                       className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       step="0.1" />
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Boutons d'action */}
// //             <div className="flex gap-4">
// //               <button
// //                 onClick={solveProblem}
// //                 className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
// //               >
// //                 <Play className="w-5 h-5" />
// //                 Résoudre
// //               </button>
// //               <button
// //                 onClick={resetProblem}
// //                 className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
// //               >
// //                 <RotateCcw className="w-5 h-5" />
// //                 Reset
// //               </button>
// //             </div>
// //           </div>

// //           {/* Résultats */}
// //           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
// //             <div className="flex items-center justify-between mb-8">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
// //                   <Lightbulb className="w-5 h-5 text-white" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-white">Résultats</h2>
// //               </div>
// //               {steps.length > 0 && (
// //                 <button
// //                   onClick={() => setShowSteps(!showSteps)}
// //                   className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all duration-300 border border-white/20"
// //                 >
// //                   {showSteps ? 'Masquer' : 'Voir'} les étapes
// //                 </button>
// //               )}
// //             </div>

// //             {!solution ? (
// //               <div className="text-center py-12">
// //                 <div className="w-24 h-24 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
// //                   <Calculator className="w-12 h-12 text-slate-400" />
// //                 </div>
// //                 <p className="text-slate-400 text-lg">
// //                   Configurez votre problème et cliquez sur "Résoudre"
// //                 </p>
// //               </div>
// //             ) : (
// //               <div className="space-y-6">
// //                 {solution.status === 'optimal' && solution.solution && (
// //                   <div className="space-y-4">
// //                     <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
// //                       <h3 className="text-xl font-bold text-green-400 mb-4">Solution Optimale</h3>
// //                       <div className="space-y-3">
// //                         <div className="text-2xl font-bold text-white">
// //                           Z = {formatNumber(solution.solution.objectiveValue * -Math.abs(1))} 
// //                         </div>
// //                         <div className="grid grid-cols-2 gap-3">
// //                           {solution.solution.variables.map((value, i) => (
// //                             <div key={i} className="bg-white/10 rounded-lg p-3">
// //                               <span className="text-slate-300">x{i + 1} = </span>
// //                               <span className="text-white font-semibold">{formatNumber(value)}</span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {solution.status === 'unbounded' && (
// //                   <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
// //                     <h3 className="text-xl font-bold text-red-400 mb-2">Problème Non Borné</h3>
// //                     <p className="text-slate-300">Le problème n'a pas de solution optimale finie.</p>
// //                   </div>
// //                 )}

// //                 {solution.status === 'error' && (
// //                   <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
// //                     <h3 className="text-xl font-bold text-red-400 mb-2">Erreur</h3>
// //                     <p className="text-slate-300">{solution.message}</p>
// //                   </div>
// //                 )}

// //                 {/* Étapes de résolution */}
// //                 {showSteps && steps.length > 0 && (
// //                   <div className="space-y-4">
// //                     <h3 className="text-xl font-bold text-white">Étapes de Résolution</h3>
// //                     <div className="space-y-4 max-h-96 overflow-y-auto">
// //                       {steps.map((step, i) => (
// //                         <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
// //                           <div className="text-blue-400 font-semibold mb-2">
// //                             Étape {i + 1}: {step.message}
// //                           </div>
// //                           {step.tableau && (
// //                             <div className="overflow-x-auto">
// //                               <table className="w-full text-xs">
// //                                 <tbody>
// //                                   {step.tableau.map((row, ri) => (
// //                                     <tr key={ri} className={ri === step.tableau.length - 1 ? 'border-t border-white/20' : ''}>
// //                                       {row.map((cell, ci) => (
// //                                         <td key={ci} className="px-2 py-1 text-center text-slate-300">
// //                                           {formatNumber(cell)}
// //                                         </td>
// //                                       ))}
// //                                     </tr>
// //                                   ))}
// //                                 </tbody>
// //                               </table>
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Section éducative */}
// //         <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
// //           <h2 className="text-3xl font-bold text-white mb-8 text-center">
// //             Comment fonctionne la méthode du Simplexe ?
// //           </h2>
// //           <div className="grid md:grid-cols-3 gap-8">
// //             <div className="text-center">
// //               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-2xl font-bold text-white">1</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-white mb-3">Forme Standard</h3>
// //               <p className="text-slate-300 leading-relaxed">
// //                 Conversion du problème en forme standard en ajoutant des variables d'écart pour transformer les inégalités en égalités.
// //               </p>
// //             </div>
// //             <div className="text-center">
// //               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-2xl font-bold text-white">2</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-white mb-3">Tableau Initial</h3>
// //               <p className="text-slate-300 leading-relaxed">
// //                 Construction du tableau du simplexe avec les coefficients des contraintes et de la fonction objectif.
// //               </p>
// //             </div>
// //             <div className="text-center">
// //               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                 <span className="text-2xl font-bold text-white">3</span>
// //               </div>
// //               <h3 className="text-xl font-bold text-white mb-3">Itérations</h3>
// //               <p className="text-slate-300 leading-relaxed">
// //                 Opérations de pivot successives jusqu'à atteindre la solution optimale ou détecter un problème non borné.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //     </>
// //   );
// // };

// // export default SimplexSolver;







































































































































































































// 'use client'
// import React, { useState, useCallback } from 'react';
// import { Calculator, Plus, Minus, Play, RotateCcw, BookOpen, Lightbulb, Settings } from 'lucide-react';

// const SimplexSolver = () => {
//   const [numVariables, setNumVariables] = useState(2);
//   const [numConstraints, setNumConstraints] = useState(2);
//   const [objective, setObjective] = useState([1, 1]);
//   const [constraints, setConstraints] = useState([[1, 1], [2, 1]]);
//   const [rhs, setRhs] = useState([4, 6]);
//   const [isMaximization, setIsMaximization] = useState(true);
//   const [inequalities, setInequalities] = useState(['<=', '<=']);
//   const [method, setMethod] = useState('standard'); // 'standard', 'dual', 'bigM'
//   const [solution, setSolution] = useState(null);
//   const [steps, setSteps] = useState([]);
//   const [showSteps, setShowSteps] = useState(false);

//   // Classe principale pour résoudre le simplexe avec toutes les méthodes
//   class SimplexSolver {
//     constructor(c, A, b, inequalities, isMax = true, method = 'standard') {
//       this.originalC = [...c];
//       this.originalA = A.map(row => [...row]);
//       this.originalB = [...b];
//       this.originalInequalities = [...inequalities];
//       this.isMax = isMax;
//       this.method = method;
//       this.numVars = c.length;
//       this.numConstraints = b.length;
//       this.steps = [];
//       this.tableau = [];
//       this.basicVars = [];
//       this.nonBasicVars = [];
//       this.M = 1000000; // Grande valeur pour la méthode du grand M
//     }

//     solve() {
//       try {
//         // Vérifier la faisabilité du problème
//         if (!this.checkFeasibility()) {
//           return { 
//             status: 'infeasible', 
//             message: 'Le problème n\'est pas réalisable',
//             steps: this.steps 
//           };
//         }

//         switch (this.method) {
//           case 'dual':
//             return this.solveDual();
//           case 'bigM':
//             return this.solveBigM();
//           default:
//             return this.solveStandard();
//         }
//       } catch (error) {
//         return { 
//           status: 'error', 
//           message: error.message,
//           steps: this.steps 
//         };
//       }
//     }

//     checkFeasibility() {
//       // Vérifier si les contraintes sont cohérentes
//       for (let i = 0; i < this.numConstraints; i++) {
//         if (this.originalB[i] < 0 && this.originalInequalities[i] === '>=') {
//           return false;
//         }
//       }
//       return true;
//     }

//     // MÉTHODE STANDARD (améliorée)
//     solveStandard() {
//       this.steps.push({
//         type: 'method',
//         message: 'Utilisation de la méthode du simplexe standard'
//       });

//       // Vérifier si on a besoin de variables artificielles
//       let needsArtificial = this.originalInequalities.some(ineq => ineq === '>=' || ineq === '=');
      
//       if (needsArtificial) {
//         this.steps.push({
//           type: 'warning',
//           message: 'Des contraintes d\'égalité ou ≥ détectées. Utilisation de la méthode du grand M recommandée.'
//         });
//         return this.solveBigM();
//       }

//       this.setupStandardTableau();
//       return this.solveTableau();
//     }

//     setupStandardTableau() {
//       // Conversion pour maximisation (si nécessaire)
//       this.c = this.isMax ? this.originalC.map(x => -x) : [...this.originalC];
//       this.A = this.originalA.map(row => [...row]);
//       this.b = [...this.originalB];

//       // Ajouter variables d'écart
//       let slackVars = 0;
//       for (let i = 0; i < this.numConstraints; i++) {
//         if (this.originalInequalities[i] === '<=') {
//           slackVars++;
//         }
//       }

//       const totalVars = this.numVars + slackVars;
//       const rows = this.numConstraints + 1;
//       const cols = totalVars + 1;

//       this.tableau = Array(rows).fill().map(() => Array(cols).fill(0));
//       this.basicVars = [];
//       this.nonBasicVars = [];

//       // Variables non-basiques initiales
//       for (let i = 0; i < this.numVars; i++) {
//         this.nonBasicVars.push(i);
//       }

//       // Remplir les contraintes
//       let slackIndex = this.numVars;
//       for (let i = 0; i < this.numConstraints; i++) {
//         // Variables originales
//         for (let j = 0; j < this.numVars; j++) {
//           this.tableau[i][j] = this.A[i][j];
//         }

//         // Variable d'écart
//         if (this.originalInequalities[i] === '<=') {
//           this.tableau[i][slackIndex] = 1;
//           this.basicVars.push(slackIndex);
//           slackIndex++;
//         }

//         // RHS
//         this.tableau[i][cols - 1] = this.b[i];
//       }

//       // Fonction objectif
//       for (let j = 0; j < this.numVars; j++) {
//         this.tableau[rows - 1][j] = this.c[j];
//       }

//       this.steps.push({
//         type: 'initial',
//         message: 'Tableau initial (méthode standard)',
//         tableau: this.copyTableau()
//       });
//     }

//     // MÉTHODE DUALE
//     solveDual() {
//       this.steps.push({
//         type: 'method',
//         message: 'Utilisation de la méthode duale du simplexe'
//       });

//       // Construire le problème dual
//       const dualProblem = this.constructDualProblem();
      
//       this.steps.push({
//         type: 'dual_construction',
//         message: 'Construction du problème dual',
//         dualProblem: dualProblem
//       });

//       // Résoudre le dual avec la méthode standard
//       this.setupDualTableau(dualProblem);
//       const dualResult = this.solveTableau();

//       if (dualResult.status === 'optimal') {
//         // Extraire la solution du primal à partir du dual
//         const primalSolution = this.extractPrimalFromDual(dualResult.solution);
        
//         this.steps.push({
//           type: 'dual_to_primal',
//           message: 'Conversion de la solution duale vers la solution primale',
//           dualSolution: dualResult.solution,
//           primalSolution: primalSolution
//         });

//         return {
//           status: 'optimal',
//           solution: primalSolution,
//           dualSolution: dualResult.solution,
//           steps: this.steps
//         };
//       }

//       return dualResult;
//     }

//     constructDualProblem() {
//       // Pour un problème primal de maximisation:
//       // max c^T x subject to Ax <= b, x >= 0
//       // Le dual est: min b^T y subject to A^T y >= c, y >= 0

//       const dualObjective = [...this.originalB];
//       const dualConstraints = [];
//       const dualRHS = [...this.originalC];
//       const dualInequalities = [];

//       // Transposer la matrice A
//       for (let j = 0; j < this.numVars; j++) {
//         const row = [];
//         for (let i = 0; i < this.numConstraints; i++) {
//           row.push(this.originalA[i][j]);
//         }
//         dualConstraints.push(row);
//         dualInequalities.push(this.isMax ? '>=' : '<=');
//       }

//       return {
//         objective: dualObjective,
//         constraints: dualConstraints,
//         rhs: dualRHS,
//         inequalities: dualInequalities,
//         isMax: !this.isMax // Le dual d'un max est un min et vice versa
//       };
//     }

//     setupDualTableau(dualProblem) {
//       this.c = dualProblem.isMax ? dualProblem.objective.map(x => -x) : [...dualProblem.objective];
//       this.A = dualProblem.constraints.map(row => [...row]);
//       this.b = [...dualProblem.rhs];

//       // Pour le dual, on a généralement besoin de variables d'excès et artificielles
//       const needsArtificial = true; // Le dual a souvent des contraintes >=
      
//       if (needsArtificial) {
//         this.setupBigMTableau(this.c, this.A, this.b, dualProblem.inequalities);
//       } else {
//         this.setupStandardTableau();
//       }
//     }

//     extractPrimalFromDual(dualSolution) {
//       // La solution primale se trouve dans les coûts réduits du tableau final dual
//       const primalVariables = [];
      
//       // Pour chaque variable primale, regarder le coût réduit correspondant dans le dual
//       const lastRow = this.tableau[this.tableau.length - 1];
      
//       for (let i = 0; i < this.numVars; i++) {
//         // La valeur de x_i est le coût réduit de la contrainte i dans le dual
//         primalVariables.push(Math.abs(lastRow[this.numConstraints + i] || 0));
//       }

//       const objectiveValue = this.isMax ? 
//         -lastRow[lastRow.length - 1] : lastRow[lastRow.length - 1];

//       return {
//         variables: primalVariables,
//         objectiveValue: objectiveValue
//       };
//     }

//     // MÉTHODE DU GRAND M
//     solveBigM() {
//       this.steps.push({
//         type: 'method',
//         message: 'Utilisation de la méthode du grand M'
//       });

//       this.setupBigMTableau(
//         this.originalC, 
//         this.originalA, 
//         this.originalB, 
//         this.originalInequalities
//       );
      
//       const result = this.solveTableau();
      
//       if (result.status === 'optimal') {
//         // Vérifier qu'aucune variable artificielle n'est dans la base
//         if (this.hasArtificialInBasis()) {
//           return {
//             status: 'infeasible',
//             message: 'Le problème n\'est pas réalisable (variables artificielles en base)',
//             steps: this.steps
//           };
//         }
//       }
      
//       return result;
//     }

//     setupBigMTableau(c, A, b, inequalities) {
//       // Convertir en forme de minimisation si nécessaire
//       this.c = this.isMax ? c.map(x => -x) : [...c];
//       this.A = A.map(row => [...row]);
//       this.b = [...b];

//       // Compter les variables nécessaires
//       let numSlack = 0;
//       let numSurplus = 0;
//       let numArtificial = 0;

//       inequalities.forEach(ineq => {
//         if (ineq === '<=') numSlack++;
//         else if (ineq === '>=') {
//           numSurplus++;
//           numArtificial++;
//         } else if (ineq === '=') {
//           numArtificial++;
//         }
//       });

//       const totalVars = this.numVars + numSlack + numSurplus + numArtificial;
//       const rows = this.numConstraints + 1;
//       const cols = totalVars + 1;

//       this.tableau = Array(rows).fill().map(() => Array(cols).fill(0));
//       this.basicVars = [];
//       this.nonBasicVars = [];
//       this.artificialVars = [];

//       // Variables non-basiques initiales
//       for (let i = 0; i < this.numVars; i++) {
//         this.nonBasicVars.push(i);
//       }

//       // Remplir les contraintes
//       let slackIndex = this.numVars;
//       let surplusIndex = this.numVars + numSlack;
//       let artificialIndex = this.numVars + numSlack + numSurplus;

//       for (let i = 0; i < this.numConstraints; i++) {
//         // Variables originales
//         for (let j = 0; j < this.numVars; j++) {
//           this.tableau[i][j] = this.A[i][j];
//         }

//         // RHS
//         this.tableau[i][cols - 1] = this.b[i];

//         if (inequalities[i] === '<=') {
//           // Variable d'écart
//           this.tableau[i][slackIndex] = 1;
//           this.basicVars.push(slackIndex);
//           slackIndex++;
//         } else if (inequalities[i] === '>=') {
//           // Variable d'excès
//           this.tableau[i][surplusIndex] = -1;
//           this.nonBasicVars.push(surplusIndex);
//           surplusIndex++;
          
//           // Variable artificielle
//           this.tableau[i][artificialIndex] = 1;
//           this.basicVars.push(artificialIndex);
//           this.artificialVars.push(artificialIndex);
//           artificialIndex++;
//         } else if (inequalities[i] === '=') {
//           // Variable artificielle
//           this.tableau[i][artificialIndex] = 1;
//           this.basicVars.push(artificialIndex);
//           this.artificialVars.push(artificialIndex);
//           artificialIndex++;
//         }
//       }

//       // Fonction objectif avec pénalités pour les variables artificielles
//       for (let j = 0; j < this.numVars; j++) {
//         this.tableau[rows - 1][j] = this.c[j];
//       }

//       // Ajouter les pénalités M pour les variables artificielles
//       this.artificialVars.forEach(artVar => {
//         this.tableau[rows - 1][artVar] = this.M;
//       });

//       // Éliminer les variables artificielles de la fonction objectif
//       this.eliminateArtificialFromObjective();

//       this.steps.push({
//         type: 'initial',
//         message: 'Tableau initial (méthode du grand M)',
//         tableau: this.copyTableau(),
//         artificialVars: [...this.artificialVars]
//       });
//     }

//     eliminateArtificialFromObjective() {
//       // Pour chaque variable artificielle en base, éliminer son coefficient de la fonction objectif
//       const objRow = this.tableau.length - 1;
      
//       this.artificialVars.forEach((artVar, index) => {
//         if (this.basicVars.includes(artVar)) {
//           const constraintRow = this.basicVars.indexOf(artVar);
//           const multiplier = this.tableau[objRow][artVar];
          
//           // Soustraire multiplier * ligne_contrainte de la fonction objectif
//           for (let j = 0; j < this.tableau[objRow].length; j++) {
//             this.tableau[objRow][j] -= multiplier * this.tableau[constraintRow][j];
//           }
//         }
//       });
//     }

//     hasArtificialInBasis() {
//       return this.artificialVars.some(artVar => 
//         this.basicVars.includes(artVar) && 
//         this.tableau[this.basicVars.indexOf(artVar)][this.tableau[0].length - 1] > 1e-10
//       );
//     }

//     // ALGORITHME PRINCIPAL DU SIMPLEXE
//     solveTableau() {
//       let iteration = 0;
//       const maxIterations = 100;

//       while (!this.isOptimal() && iteration < maxIterations) {
//         iteration++;

//         const enteringVar = this.findEnteringVariable();
//         if (enteringVar === -1) break;

//         const leavingVarIndex = this.findLeavingVariable(enteringVar);
//         if (leavingVarIndex === -1) {
//           this.steps.push({
//             type: 'unbounded',
//             message: 'Le problème n\'a pas de solution bornée'
//           });
//           return { status: 'unbounded', steps: this.steps };
//         }

//         const leavingVar = this.basicVars[leavingVarIndex];
//         this.pivot(leavingVarIndex, enteringVar);
        
//         // Mise à jour des variables de base
//         this.basicVars[leavingVarIndex] = enteringVar;
        
//         // Mise à jour des variables non-basiques
//         const enteringIndex = this.nonBasicVars.indexOf(enteringVar);
//         if (enteringIndex !== -1) {
//           this.nonBasicVars[enteringIndex] = leavingVar;
//         }

//         this.steps.push({
//           type: 'iteration',
//           message: `Itération ${iteration}: x${enteringVar + 1} entre, x${leavingVar + 1} sort`,
//           tableau: this.copyTableau(),
//           entering: enteringVar,
//           leaving: leavingVar
//         });
//       }

//       if (iteration >= maxIterations) {
//         return { status: 'max_iterations', steps: this.steps };
//       }

//       const result = this.extractSolution();
//       this.steps.push({
//         type: 'optimal',
//         message: 'Solution optimale trouvée',
//         solution: result
//       });

//       return { status: 'optimal', solution: result, steps: this.steps };
//     }

//     isOptimal() {
//       const lastRow = this.tableau[this.tableau.length - 1];
//       for (let i = 0; i < lastRow.length - 1; i++) {
//         if (lastRow[i] < -1e-10) return false;
//       }
//       return true;
//     }

//     findEnteringVariable() {
//       const lastRow = this.tableau[this.tableau.length - 1];
//       let minValue = 0;
//       let enteringVar = -1;

//       for (let i = 0; i < lastRow.length - 1; i++) {
//         if (lastRow[i] < minValue) {
//           minValue = lastRow[i];
//           enteringVar = i;
//         }
//       }

//       return enteringVar;
//     }

//     findLeavingVariable(enteringVar) {
//       let minRatio = Infinity;
//       let leavingVarIndex = -1;

//       for (let i = 0; i < this.numConstraints; i++) {
//         const pivot = this.tableau[i][enteringVar];
//         if (pivot > 1e-10) {
//           const ratio = this.tableau[i][this.tableau[0].length - 1] / pivot;
//           if (ratio >= 0 && ratio < minRatio) {
//             minRatio = ratio;
//             leavingVarIndex = i;
//           }
//         }
//       }

//       return leavingVarIndex;
//     }

//     pivot(pivotRow, pivotCol) {
//       const pivotElement = this.tableau[pivotRow][pivotCol];

//       // Normaliser la ligne pivot
//       for (let j = 0; j < this.tableau[pivotRow].length; j++) {
//         this.tableau[pivotRow][j] /= pivotElement;
//       }

//       // Éliminer les autres éléments de la colonne pivot
//       for (let i = 0; i < this.tableau.length; i++) {
//         if (i !== pivotRow) {
//           const factor = this.tableau[i][pivotCol];
//           for (let j = 0; j < this.tableau[i].length; j++) {
//             this.tableau[i][j] -= factor * this.tableau[pivotRow][j];
//           }
//         }
//       }
//     }

//     extractSolution() {
//       const solution = Array(this.numVars).fill(0);

//       for (let i = 0; i < this.basicVars.length; i++) {
//         const varIndex = this.basicVars[i];
//         if (varIndex < this.numVars) {
//           solution[varIndex] = this.tableau[i][this.tableau[0].length - 1];
//         }
//       }

//       const objectiveValue = this.isMax ? 
//         -this.tableau[this.tableau.length - 1][this.tableau[0].length - 1] :
//         this.tableau[this.tableau.length - 1][this.tableau[0].length - 1];

//       return {
//         variables: solution,
//         objectiveValue: objectiveValue
//       };
//     }

//     copyTableau() {
//       return this.tableau.map(row => [...row]);
//     }
//   }

//   // Fonctions utilitaires pour l'interface
//   const updateConstraint = (i, j, value) => {
//     const newConstraints = [...constraints];
//     newConstraints[i][j] = parseFloat(value) || 0;
//     setConstraints(newConstraints);
//   };

//   const updateObjective = (i, value) => {
//     const newObjective = [...objective];
//     newObjective[i] = parseFloat(value) || 0;
//     setObjective(newObjective);
//   };

//   const updateRHS = (i, value) => {
//     const newRHS = [...rhs];
//     newRHS[i] = parseFloat(value) || 0;
//     setRhs(newRHS);
//   };

//   const updateInequality = (i, value) => {
//     const newInequalities = [...inequalities];
//     newInequalities[i] = value;
//     setInequalities(newInequalities);
//   };

//   const addConstraint = () => {
//     setNumConstraints(prev => {
//       const newNum = prev + 1;
//       setConstraints(prev => [...prev, Array(numVariables).fill(0)]);
//       setRhs(prev => [...prev, 0]);
//       setInequalities(prev => [...prev, '<=']);
//       return newNum;
//     });
//   };

//   const removeConstraint = () => {
//     if (numConstraints > 1) {
//       setNumConstraints(prev => prev - 1);
//       setConstraints(prev => prev.slice(0, -1));
//       setRhs(prev => prev.slice(0, -1));
//       setInequalities(prev => prev.slice(0, -1));
//     }
//   };

//   const addVariable = () => {
//     setNumVariables(prev => {
//       const newNum = prev + 1;
//       setObjective(prev => [...prev, 0]);
//       setConstraints(prev => prev.map(row => [...row, 0]));
//       return newNum;
//     });
//   };

//   const removeVariable = () => {
//     if (numVariables > 2) {
//       setNumVariables(prev => prev - 1);
//       setObjective(prev => prev.slice(0, -1));
//       setConstraints(prev => prev.map(row => row.slice(0, -1)));
//     }
//   };

//   const solveProblem = () => {
//     const solver = new SimplexSolver(objective, constraints, rhs, inequalities, isMaximization, method);
//     const result = solver.solve();
//     setSolution(result);
//     setSteps(result.steps || []);
//   };

//   const resetProblem = () => {
//     setSolution(null);
//     setSteps([]);
//     setShowSteps(false);
//   };

//   const formatNumber = (num) => {
//     if (typeof num !== 'number' || isNaN(num)) return '0';
//     return Math.abs(num) < 1e-10 ? '0' : num.toFixed(4);
//   };

//   const getMethodDescription = () => {
//     switch (method) {
//       case 'standard':
//         return 'Méthode standard pour problèmes avec contraintes ≤ uniquement';
//       case 'dual':
//         return 'Méthode duale - résout le problème dual puis extrait la solution primale';
//       case 'bigM':
//         return 'Méthode du grand M - gère tous types de contraintes (≤, ≥, =)';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       <div className="relative z-10 container mx-auto px-4 py-8">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
//             <Calculator className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
//             Solveur Simplexe Complet
//           </h1>
//           <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
//             Toutes les méthodes : Standard, Duale et Grand M
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//           {/* Configuration du problème */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
//                 <BookOpen className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">Configuration du Problème</h2>
//             </div>

//             {/* Sélection de la méthode */}
//             <div className="mb-8">
//               <label className="block text-lg font-semibold text-slate-200 mb-4">Méthode de résolution</label>
//               <div className="space-y-3">
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setMethod('standard')}
//                     className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${method === 'standard'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                         : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
//                   >
//                     Standard
//                   </button>
//                   <button
//                     onClick={() => setMethod('dual')}
//                     className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${method === 'dual'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                         : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
//                   >
//                     Duale
//                   </button>
//                   <button
//                     onClick={() => setMethod('bigM')}
//                     className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${method === 'bigM'
//                         ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                         : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
//                   >
//                     Grand M
//                   </button>
//                 </div>
//                 <p className="text-sm text-slate-400 bg-white/5 rounded-lg p-3">
//                   {getMethodDescription()}
//                 </p>
//               </div>
//             </div>

//             {/* Type d'optimisation */}
//             <div className="mb-8">
//               <label className="block text-lg font-semibold text-slate-200 mb-4">Type d'optimisation</label>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setIsMaximization(true)}
//                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${isMaximization
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                       : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
//                 >
//                   Maximisation
//                 </button>
//                 <button
//                   onClick={() => setIsMaximization(false)}
//                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${!isMaximization
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                       : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
//                 >
//                   Minimisation
//                 </button>
//               </div>
//             </div>

//             {/* Fonction objectif */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <label className="text-lg font-semibold text-slate-200">
//                   Fonction objectif: {isMaximization ? 'Maximiser' : 'Minimiser'} Z =
//                 </label>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={addVariable}
//                     className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors"
//                   >
//                     <Plus className="w-4 h-4 text-green-400" />
//                   </button>
//                   <button
//                     onClick={removeVariable}
//                     disabled={numVariables <= 2}
//                     className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
//                   >
//                     <Minus className="w-4 h-4 text-red-400" />
//                   </button>
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-3 items-center">
//                 {objective.map((coef, i) => (
//                   <div key={i} className="flex items-center gap-2">
//                     {i > 0 && <span className="text-slate-300 text-lg">+</span>}
//                     <input
//                       type="number"
//                       value={coef}
//                       onChange={(e) => updateObjective(i, e.target.value)}
//                       className="w-16 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       step="0.1" />
//                     <span className="text-slate-300 font-medium">x{i + 1}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Contraintes */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <label className="text-lg font-semibold text-slate-200">Contraintes</label>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={addConstraint}
//                     className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors"
//                   >
//                     <Plus className="w-4 h-4 text-green-400" />
//                   </button>
//                   <button
//                     onClick={removeConstraint}
//                     disabled={numConstraints <= 1}
//                     className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
//                   >
//                     <Minus className="w-4 h-4 text-red-400" />
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 {constraints.map((constraint, i) => (
//                   <div key={i} className="flex flex-wrap gap-3 items-center p-4 bg-white/5 rounded-xl border border-white/10">
//                     {constraint.map((coef, j) => (
//                       <div key={j} className="flex items-center gap-2">
//                         {j > 0 && <span className="text-slate-300">+</span>}
//                         <input
//                           type="number"
//                           value={coef}
//                           onChange={(e) => updateConstraint(i, j, e.target.value)}
//                           className="w-16 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           step="0.1" />
//                         <span className="text-slate-300 font-medium">x{j + 1}</span>
//                       </div>
//                     ))}
//                     <select
//                       value={inequalities[i]}
//                       onChange={(e) => updateInequality(i, e.target.value)}
//                       className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="<=">≤</option>
//                       <option value="=">=</option>
//                       <option value=">=">≥</option>
//                     </select>
//                     <input
//                       type="number"
//                       value={rhs[i]}
//                       onChange={(e) => updateRHS(i, e.target.value)}
//                       className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       step="0.1" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Boutons d'action */}
//             <div className="flex gap-4">
//               <button
//                 onClick={solveProblem}
//                 className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//               >
//                 <Play className="w-5 h-5" />
//                 Résoudre
//               </button>
//               <button
//                 onClick={resetProblem}
//                 className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
//               >
//                 <RotateCcw className="w-5 h-5" />
//                 Reset
//               </button>
//             </div>
//           </div>

//           {/* Résultats */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
//                   <Lightbulb className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Résultats</h2>
//               </div>
//               {steps.length > 0 && (
//                 <button
//                   onClick={() => setShowSteps(!showSteps)}
//                   className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all duration-300 border border-white/20"
//                 >
//                   {showSteps ? 'Masquer' : 'Voir'} les étapes
//                 </button>
//               )}
//             </div>

//             {!solution ? (
//               <div className="text-center py-12">
//                 <div className="w-24 h-24 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
//                   <Calculator className="w-12 h-12 text-slate-400" />
//                 </div>
//                 <p className="text-slate-400 text-lg">
//                   Configurez votre problème et cliquez sur "Résoudre"
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {solution.status === 'optimal' && solution.solution && (
//                   <div className="space-y-4">
//                     <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
//                       <h3 className="text-xl font-bold text-green-400 mb-4">Solution Optimale</h3>
//                       <div className="space-y-3">
//                         <div className="text-2xl font-bold text-white">
//                           Z = {formatNumber(solution.solution.objectiveValue)}
//                         </div>
//                         <div className="grid grid-cols-2 gap-3">
//                           {solution.solution.variables.map((value, i) => (
//                             <div key={i} className="bg-white/10 rounded-lg p-3">
//                               <span className="text-slate-300">x{i + 1} = </span>
//                               <span className="text-white font-semibold">{formatNumber(value)}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
                      
//                       {/* Afficher la solution duale si elle existe */}
//                       {solution.dualSolution && (
//                         <div className="mt-4 pt-4 border-t border-green-500/30">
//                           <h4 className="text-lg font-semibold text-green-300 mb-2">Solution Duale</h4>
//                           <div className="text-lg font-bold text-white mb-2">
//                             Z_dual = {formatNumber(solution.dualSolution.objectiveValue)}
//                           </div>
//                           <div className="grid grid-cols-2 gap-2">
//                             {solution.dualSolution.variables.map((value, i) => (
//                               <div key={i} className="bg-white/5 rounded p-2 text-sm">
//                                 <span className="text-slate-300">y{i + 1} = </span>
//                                 <span className="text-white">{formatNumber(value)}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {solution.status === 'unbounded' && (
//                   <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
//                     <h3 className="text-xl font-bold text-yellow-400 mb-2">Problème Non Borné</h3>
//                     <p className="text-slate-300">Le problème n'a pas de solution optimale finie. La fonction objectif peut être améliorée indéfiniment.</p>
//                   </div>
//                 )}

//                 {solution.status === 'infeasible' && (
//                   <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
//                     <h3 className="text-xl font-bold text-red-400 mb-2">Problème Non Réalisable</h3>
//                     <p className="text-slate-300">{solution.message || "Les contraintes sont incompatibles. Il n'existe aucune solution satisfaisant toutes les contraintes."}</p>
//                   </div>
//                 )}

//                 {solution.status === 'error' && (
//                   <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
//                     <h3 className="text-xl font-bold text-red-400 mb-2">Erreur</h3>
//                     <p className="text-slate-300">{solution.message}</p>
//                   </div>
//                 )}

//                 {solution.status === 'max_iterations' && (
//                   <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-6">
//                     <h3 className="text-xl font-bold text-orange-400 mb-2">Limite d'Itérations Atteinte</h3>
//                     <p className="text-slate-300">L'algorithme n'a pas convergé dans le nombre maximum d'itérations autorisées.</p>
//                   </div>
//                 )}

//                 {/* Étapes de résolution */}
//                 {showSteps && steps.length > 0 && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-white">Étapes de Résolution</h3>
//                     <div className="space-y-4 max-h-96 overflow-y-auto">
//                       {steps.map((step, i) => (
//                         <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
//                           <div className="text-blue-400 font-semibold mb-2">
//                             {step.type === 'method' && <span className="bg-blue-500/20 px-2 py-1 rounded text-xs mr-2">MÉTHODE</span>}
//                             {step.type === 'initial' && <span className="bg-green-500/20 px-2 py-1 rounded text-xs mr-2">INITIAL</span>}
//                             {step.type === 'iteration' && <span className="bg-purple-500/20 px-2 py-1 rounded text-xs mr-2">ITÉRATION</span>}
//                             {step.type === 'optimal' && <span className="bg-emerald-500/20 px-2 py-1 rounded text-xs mr-2">OPTIMAL</span>}
//                             {step.type === 'dual_construction' && <span className="bg-cyan-500/20 px-2 py-1 rounded text-xs mr-2">DUAL</span>}
//                             {step.type === 'warning' && <span className="bg-yellow-500/20 px-2 py-1 rounded text-xs mr-2">ATTENTION</span>}
//                             {step.message}
//                           </div>
                          
//                           {step.tableau && (
//                             <div className="overflow-x-auto mt-3">
//                               <table className="w-full text-xs border-collapse">
//                                 <tbody>
//                                   {step.tableau.map((row, ri) => (
//                                     <tr key={ri} className={ri === step.tableau.length - 1 ? 'border-t border-white/20' : ''}>
//                                       {row.map((cell, ci) => (
//                                         <td key={ci} className="px-2 py-1 text-center text-slate-300 border border-white/10">
//                                           {formatNumber(cell)}
//                                         </td>
//                                       ))}
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           )}

//                           {step.dualProblem && (
//                             <div className="mt-3 p-3 bg-white/5 rounded-lg">
//                               <h5 className="text-sm font-semibold text-cyan-300 mb-2">Problème Dual Construit:</h5>
//                               <div className="text-xs text-slate-300 space-y-1">
//                                 <div>Objectif: {step.dualProblem.isMax ? 'Max' : 'Min'} {step.dualProblem.objective.map(formatNumber).join(' + ')}</div>
//                                 <div>Contraintes: {step.dualProblem.constraints.length} contraintes</div>
//                               </div>
//                             </div>
//                           )}

//                           {step.artificialVars && step.artificialVars.length > 0 && (
//                             <div className="mt-3 p-3 bg-red-500/10 rounded-lg">
//                               <h5 className="text-sm font-semibold text-red-300 mb-1">Variables Artificielles:</h5>
//                               <div className="text-xs text-slate-300">
//                                 Variables {step.artificialVars.map(v => `x${v+1}`).join(', ')} avec pénalité M
//                               </div>
//                             </div>
//                           )}

//                           {step.entering !== undefined && step.leaving !== undefined && (
//                             <div className="mt-3 flex gap-4 text-xs">
//                               <span className="text-green-300">Entre: x{step.entering + 1}</span>
//                               <span className="text-red-300">Sort: x{step.leaving + 1}</span>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Section éducative améliorée */}
//         <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
//           <h2 className="text-3xl font-bold text-white mb-8 text-center">
//             Les Trois Méthodes du Simplexe
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-white">S</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Méthode Standard</h3>
//               <p className="text-slate-300 leading-relaxed text-sm">
//                 Utilisée pour les problèmes avec contraintes ≤ uniquement. Ajoute des variables d'écart pour transformer les inégalités en égalités. Méthode la plus simple et efficace pour ce type de problèmes.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-white">D</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Méthode Duale</h3>
//               <p className="text-slate-300 leading-relaxed text-sm">
//                 Résout le problème dual au lieu du primal. Utile quand le dual a moins de contraintes que le primal, ou pour certains types d'analyses de sensibilité. La solution optimale est identique.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-white">M</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Méthode du Grand M</h3>
//               <p className="text-slate-300 leading-relaxed text-sm">
//                 Méthode universelle qui gère tous types de contraintes (≤, ≥, =). Utilise des variables artificielles avec une pénalité M très grande. Indispensable pour les problèmes mixtes.
//               </p>
//             </div>
//           </div>
          
//           <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
//             <h3 className="text-xl font-bold text-white mb-4 text-center">Guide de Sélection</h3>
//             <div className="grid md:grid-cols-3 gap-6 text-sm">
//               <div className="text-center">
//                 <div className="text-blue-300 font-semibold mb-2">Contraintes ≤ seulement</div>
//                 <div className="text-slate-300">→ Méthode Standard</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-purple-300 font-semibold mb-2">Problème avec peu de contraintes</div>
//                 <div className="text-slate-300">→ Méthode Duale</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-green-300 font-semibold mb-2">Contraintes mixtes (≤, ≥, =)</div>
//                 <div className="text-slate-300">→ Méthode du Grand M</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//           )
//         }

// export default SimplexSolver;






// 'use client'
// import React, { useState } from 'react';
// import { Calculator, Plus, Minus, Play, RotateCcw, BookOpen, Lightbulb } from 'lucide-react';
// import { SimplexSolver as SimplexAlgorithm } from './simplexAlgorithm';

// const SimplexPage = () => {
//   const [numVariables, setNumVariables] = useState(2);
//   const [numConstraints, setNumConstraints] = useState(2);
//   // Exemple pour minimisation avec >= : min Z = 2x1 + 3x2
//   // s.t. x1 + x2 >= 5
//   //      x1      >= 2
//   // Solution: x1=2, x2=3, Z=13
//   const [objective, setObjective] = useState([2, 3]); // Exemple pour min
//   const [constraints, setConstraints] = useState([[1, 1], [1, 0]]); // Exemple pour min
//   const [rhs, setRhs] = useState([5, 2]); // Exemple pour min
//   const [isMaximization, setIsMaximization] = useState(false); // Default to min for example
//   const [inequalities, setInequalities] = useState(['>=', '>=']); // Exemple pour min
  
//   const [solution, setSolution] = useState(null);
//   const [steps, setSteps] = useState([]);
//   const [showSteps, setShowSteps] = useState(false);

//   // ... (fonctions updateConstraint, updateObjective, etc. restent les mêmes) ...
//   const updateConstraint = (i, j, value) => {
//     const newConstraints = constraints.map(row => [...row]);
//     newConstraints[i][j] = parseFloat(value) || 0;
//     setConstraints(newConstraints);
//   };

//   const updateObjective = (i, value) => {
//     const newObjective = [...objective];
//     newObjective[i] = parseFloat(value) || 0;
//     setObjective(newObjective);
//   };

//   const updateRHS = (i, value) => {
//     const newRHS = [...rhs];
//     newRHS[i] = parseFloat(value) || 0;
//     setRhs(newRHS);
//   };

//   const updateInequality = (i, value) => {
//     const newInequalities = [...inequalities];
//     newInequalities[i] = value;
//     setInequalities(newInequalities);
//   };

//   const addConstraint = () => {
//     setNumConstraints(prevNum => {
//       const newNum = prevNum + 1;
//       setConstraints(prevConst => [...prevConst, Array(numVariables).fill(0)]);
//       setRhs(prevRhs => [...prevRhs, 0]);
//       setInequalities(prevIneq => [...prevIneq, isMaximization ? '<=' : '>=']); // Default based on current mode
//       return newNum;
//     });
//   };

//   const removeConstraint = () => {
//     if (numConstraints > 1) {
//       setNumConstraints(prev => prev - 1);
//       setConstraints(prev => prev.slice(0, -1));
//       setRhs(prev => prev.slice(0, -1));
//       setInequalities(prev => prev.slice(0, -1));
//     }
//   };

//   const addVariable = () => {
//     setNumVariables(prevNum => {
//       const newNum = prevNum + 1;
//       setObjective(prevObj => [...prevObj, 0]);
//       setConstraints(prevConst => prevConst.map(row => [...row, 0]));
//       return newNum;
//     });
//   };

//   const removeVariable = () => {
//     if (numVariables > 1) { // Allow 1 variable
//       setNumVariables(prev => prev - 1);
//       setObjective(prev => prev.slice(0, -1));
//       setConstraints(prev => prev.map(row => row.slice(0, -1)));
//     }
//   };


//   const solveProblem = () => {
//     let methodToUse = 'primal_big_m';
//     let processedObjective = [...objective];
//     let processedConstraints = constraints.map(c => [...c]);
//     let processedRhs = [...rhs];
//     let processedInequalities = [...inequalities];
//     const optimizationType = isMaximization ? 'maximize' : 'minimize';

//     if (optimizationType === 'minimize') {
//       // Condition pour utiliser le simplexe dual:
//       // 1. Problème de minimisation.
//       // 2. Tous les coefficients de la fonction objectif sont >= 0.
//       // 3. Toutes les contraintes sont de type '>=' (ou peuvent y être transformées).
//       // (Note: '=' contraintes sont plus complexes pour le dual simple sans phase I duale)
//       const objectiveCoeffsOkForDual = objective.every(coeff => coeff >= -1e-9); // allow small negatives
//       const constraintsOkForDual = inequalities.every(ineq => ineq === '>=');
      
//       // Option pour l'utilisateur de forcer le dual, ou auto-détection. Ici, auto-détection simple.
//       if (objectiveCoeffsOkForDual && constraintsOkForDual && inequalities.length > 0) {
//           methodToUse = 'dual';
//           // Transformer AX >= b  en  -AX <= -b
//           // La fonction objectif (min cX) reste la même.
//           processedConstraints = constraints.map(row => row.map(coeff => -coeff));
//           processedRhs = rhs.map(val => -val);
//           // Toutes les inégalités deviennent '<=' pour que le setup dual ajoute des variables d'écart
//           processedInequalities = inequalities.map(() => '<='); 
//           console.log("Préparation pour le Simplexe Dual...");
//       } else {
//           console.log("Utilisation du Simplexe Primal (Big M) pour la minimisation.");
//       }
//     } else { // Maximisation
//         console.log("Utilisation du Simplexe Primal (Big M) pour la maximisation.");
//     }

//     const solver = new SimplexAlgorithm(
//       processedObjective,
//       processedConstraints,
//       processedRhs,
//       processedInequalities, // Ces inégalités sont celles APRÈS transformation pour le dual
//       optimizationType,
//       methodToUse
//     );
//     const result = solver.solve();
    
//     setSolution(result);
//     setSteps(result.steps || []);
//     if (result.steps && result.steps.length > 0) {
//         setShowSteps(true);
//     }
//   };

//   const resetProblem = () => {
//     setNumVariables(2);
//     setNumConstraints(2);
//     // Rétablir l'exemple de minimisation
//     setObjective([2, 3]); 
//     setConstraints([[1, 1], [1, 0]]); 
//     setRhs([5, 2]); 
//     setIsMaximization(false); 
//     setInequalities(['>=', '>=']); 
//     setSolution(null);
//     setSteps([]);
//     setShowSteps(false);
//   };

//   const formatNumber = (num) => {
//     if (typeof num !== 'number' || isNaN(num)) return 'N/A';
//     if (Math.abs(num) < 1e-9) return '0.000';
//     return num.toFixed(3);
//   };
  
//   const getTableauHeaders = (step) => {
//     if (!step || !step.tableau || !step.tableau[0] || !step.basicVars) return [];
    
//     const numColsInTableau = step.tableau[0].length;
//     const numTableVars = numColsInTableau - 1; // Exclure RHS
//     const numOriginal = step.numOriginalVars; // Doit être fourni par le step
//     const numSlack = step.numSlackVars !== undefined ? step.numSlackVars : (numTableVars - numOriginal); // Estimation
//     // Pour un affichage plus précis, il faudrait que `step` contienne numSlack, numSurplus, numArtificial

//     const headers = ["Base"];
//     let varCounter = 1;
//     let slackCounter = 1;
//     let surplusCounter = 1;
//     let artificialCounter = 1;

//     for (let i = 0; i < numTableVars; i++) {
//         if (i < numOriginal) {
//             headers.push(`x${varCounter++}`);
//         } else if (step.varTypes && step.varTypes[i]) { // Si on a des types de variables détaillés
//             headers.push(step.varTypes[i]);
//         }
//         // Heuristique si pas d'infos détaillées (typique pour dual simple: que des slack)
//         else if (i < numOriginal + numSlack) {
//              headers.push(`s${slackCounter++}`);
//         } else {
//             headers.push(`a${artificialCounter++}`); // Fallback générique
//         }
//     }
//     headers.push("RHS");
//     return headers;
//   };


//   return (
//     <>
//     {/* ... UI inchangée ... */}
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
//             <Calculator className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
//             Solveur Simplexe
//           </h1>
//           <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
//             Résolvez vos problèmes de programmation linéaire (primal ou dual simple).
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//           {/* Configuration du problème */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
//                 <BookOpen className="w-5 h-5 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">Configuration du Problème</h2>
//             </div>

//             {/* Type d'optimisation */}
//             <div className="mb-8">
//               <label className="block text-lg font-semibold text-slate-200 mb-4">Type d'optimisation</label>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setIsMaximization(true)}
//                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${isMaximization
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                       : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
//                 >
//                   Maximisation
//                 </button>
//                 <button
//                   onClick={() => setIsMaximization(false)}
//                   className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${!isMaximization
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                       : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
//                 >
//                   Minimisation
//                 </button>
//               </div>
//             </div>

//             {/* Fonction objectif */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <label className="text-lg font-semibold text-slate-200">
//                   Fonction objectif: {isMaximization ? 'Maximiser' : 'Minimiser'} Z =
//                 </label>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={addVariable}
//                     className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors"
//                   >
//                     <Plus className="w-4 h-4 text-green-400" />
//                   </button>
//                   <button
//                     onClick={removeVariable}
//                     disabled={numVariables <= 1}
//                     className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
//                   >
//                     <Minus className="w-4 h-4 text-red-400" />
//                   </button>
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-3 items-center">
//                 {objective.map((coef, i) => (
//                   <div key={i} className="flex items-center gap-2">
//                     {i > 0 && <span className="text-slate-300 text-lg"> + </span>}
//                     <input
//                       type="number"
//                       value={coef}
//                       onChange={(e) => updateObjective(i, e.target.value)}
//                       className="w-16 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       step="any" />
//                     <span className="text-slate-300 font-medium">x<sub>{i + 1}</sub></span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Contraintes */}
//             <div className="mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <label className="text-lg font-semibold text-slate-200">Contraintes</label>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={addConstraint}
//                     className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors"
//                   >
//                     <Plus className="w-4 h-4 text-green-400" />
//                   </button>
//                   <button
//                     onClick={removeConstraint}
//                     disabled={numConstraints <= 1}
//                     className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
//                   >
//                     <Minus className="w-4 h-4 text-red-400" />
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 {constraints.map((constraint, i) => (
//                   <div key={i} className="flex flex-wrap gap-3 items-center p-4 bg-white/5 rounded-xl border border-white/10">
//                     {constraint.map((coef, j) => (
//                       <div key={j} className="flex items-center gap-2">
//                         {j > 0 && <span className="text-slate-300">+</span>}
//                         <input
//                           type="number"
//                           value={coef}
//                           onChange={(e) => updateConstraint(i, j, e.target.value)}
//                           className="w-16 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           step="any" />
//                         <span className="text-slate-300 font-medium">x<sub>{j + 1}</sub></span>
//                       </div>
//                     ))}
//                     <select
//                       value={inequalities[i]}
//                       onChange={(e) => updateInequality(i, e.target.value)}
//                       className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="<=">≤</option>
//                       <option value="=">=</option>
//                       <option value=">=">≥</option>
//                     </select>
//                     <input
//                       type="number"
//                       value={rhs[i]}
//                       onChange={(e) => updateRHS(i, e.target.value)}
//                       className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       step="any" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Boutons d'action */}
//             <div className="flex gap-4">
//               <button
//                 onClick={solveProblem}
//                 className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//               >
//                 <Play className="w-5 h-5" />
//                 Résoudre
//               </button>
//               <button
//                 onClick={resetProblem}
//                 className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
//               >
//                 <RotateCcw className="w-5 h-5" />
//                 Reset
//               </button>
//             </div>
//           </div>

//           {/* Résultats */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
//                   <Lightbulb className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Résultats</h2>
//               </div>
//               {steps.length > 0 && (
//                 <button
//                   onClick={() => setShowSteps(!showSteps)}
//                   className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all duration-300 border border-white/20"
//                 >
//                   {showSteps ? 'Masquer' : 'Voir'} les étapes
//                 </button>
//               )}
//             </div>

//             {!solution ? (
//               <div className="text-center py-12">
//                 <div className="w-24 h-24 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
//                   <Calculator className="w-12 h-12 text-slate-400" />
//                 </div>
//                 <p className="text-slate-400 text-lg">
//                   Configurez votre problème et cliquez sur "Résoudre".
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {solution.status === 'optimal' && solution.solution && (
//                   <div className="space-y-4">
//                     <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
//                       <h3 className="text-xl font-bold text-green-400 mb-4">Solution Optimale</h3>
//                       <div className="space-y-3">
//                         <div className="text-2xl font-bold text-white">
//                           Z = {formatNumber(solution.solution.objectiveValue * - Math.abs(1))}
//                         </div>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                           {solution.solution.variables.map((value, i) => (
//                             <div key={i} className="bg-white/10 rounded-lg p-3">
//                               <span className="text-slate-300">x<sub>{i + 1}</sub> = </span>
//                               <span className="text-white font-semibold">{formatNumber(value)}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* ... autres statuts de solution (unbounded, infeasible, error, max_iterations) ... */}
//                 {solution.status === 'unbounded' && (
//                   <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
//                     <h3 className="text-xl font-bold text-yellow-400 mb-2">Problème Non Borné</h3>
//                     <p className="text-slate-300">{solution.message || "Le problème n'a pas de solution optimale finie."}</p>
//                   </div>
//                 )}
                
//                 {(solution.status === 'infeasible' || solution.status === 'infeasible_dual') && (
//                   <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-6">
//                     <h3 className="text-xl font-bold text-orange-400 mb-2">Problème Infaisable</h3>
//                     <p className="text-slate-300">{solution.message || "Aucune solution ne satisfait toutes les contraintes."}</p>
//                   </div>
//                 )}


//                 {(solution.status === 'error' || solution.status === 'max_iterations' || solution.status === 'max_iterations_dual') && (
//                   <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
//                     <h3 className="text-xl font-bold text-red-400 mb-2">
//                       {solution.status === 'error' ? 'Erreur' : 'Limite d\'itérations'}
//                     </h3>
//                     <p className="text-slate-300">{solution.message || "Impossible de trouver une solution dans le nombre d'itérations imparti."}</p>
//                   </div>
//                 )}


//                 {/* Étapes de résolution */}
//                 {showSteps && steps.length > 0 && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold text-white mt-6 mb-3">Étapes de Résolution</h3>
//                     <div className="space-y-4 max-h-[500px] overflow-y-auto p-1 bg-white/5 rounded-xl border border-white/10">
//                       {steps.map((step, i) => {
//                         const headers = getTableauHeaders(step); // Assurez-vous que getTableauHeaders est robuste
//                         const isDualStep = step.type && step.type.includes('dual');
//                         return (
//                           <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
//                             <div className={`font-semibold mb-2 ${isDualStep ? 'text-purple-400' : 'text-blue-400'}`}>
//                               Étape {step.type === 'initial' || step.type === 'initial_dual' ? 0 : i}: {step.message}
//                             </div>
//                             {step.tableau && (
//                               <div className="overflow-x-auto">
//                                 <table className="w-full text-xs border-collapse">
//                                   <thead>
//                                     <tr>
//                                       {headers.map((header, hi) => (
//                                         <th key={hi} className="px-2 py-1 text-center text-slate-300 border border-slate-600/50 bg-white/10">
//                                           {header}
//                                         </th>
//                                       ))}
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {step.tableau.map((row, ri) => (
//                                       <tr key={ri} className={ri === step.tableau.length - 1 ? 'border-t-2 border-slate-500/70' : ''}>
//                                         <td className={`px-2 py-1 text-center text-slate-300 border border-slate-700/50 
//                                           ${(ri === step.leavingRow || ri === step.leaving) && (step.type === 'iteration' || step.type === 'iteration_dual') ? 'bg-red-500/30' : ''}`}>
//                                           {ri === step.tableau.length - 1 ? 'Z' : 
//                                             (step.basicVars && step.basicVars[ri] !== undefined && step.basicVars[ri] !== -1 ? 
//                                               (step.basicVars[ri] < (step.numOriginalVars !== undefined ? step.numOriginalVars : numVariables) ? 
//                                                 `x${step.basicVars[ri] + 1}` : 
//                                                 `s${step.basicVars[ri] - (step.numOriginalVars !== undefined ? step.numOriginalVars : numVariables) + 1}`) 
//                                               : '-')}
//                                         </td>
//                                         {row.map((cell, ci) => (
//                                           <td 
//                                             key={ci} 
//                                             className={`px-2 py-1 text-center text-slate-300 border border-slate-700/50 
//                                                         ${(ri === step.leavingRow || ri === step.leaving) && ci === step.entering && (step.type === 'iteration' || step.type === 'iteration_dual') ? 'bg-yellow-500/40 font-bold' : 
//                                                          ((ri === step.leavingRow || ri === step.leaving) && (step.type === 'iteration' || step.type === 'iteration_dual') ? 'bg-red-500/30' : 
//                                                          (ci === step.entering && (step.type === 'iteration' || step.type === 'iteration_dual') ? 'bg-green-500/30' : ''))}`}
//                                           >
//                                             {formatNumber(cell)}
//                                           </td>
//                                         ))}
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Section éducative (inchangée) */}
//         <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
//           <h2 className="text-3xl font-bold text-white mb-8 text-center">
//             Comment fonctionne la méthode du Simplexe ?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-white">1</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Forme Standard</h3>
//               <p className="text-slate-300 leading-relaxed">
//                 Conversion du problème en forme standard (primal) ou préparation pour le dual (contraintes inferieure ou egale, RHS potentiellement négatifs).
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-white">2</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Tableau Initial</h3>
//               <p className="text-slate-300 leading-relaxed">
//                 Construction du tableau simplexe. Pour le primal, gestion des variables artificielles (Big M). Pour le dual, variables d'écart et fonction objectif directe.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-white">3</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Itérations</h3>
//               <p className="text-slate-300 leading-relaxed">
//                 Opérations de pivot successives (primales ou duales) jusqu'à atteindre la solution optimale ou détecter un cas spécial.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SimplexPage;



