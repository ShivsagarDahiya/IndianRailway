import React, { useState } from 'react';
import { MapPin, Calendar, ChevronDown } from 'lucide-react';

interface TrainSearchProps {
  onSearch: (params: {
    from: string;
    to: string;
    date: string;
    travelClass: string;
    quota: string;
  }) => void;
}

const TrainSearch: React.FC<TrainSearchProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [travelClass, setTravelClass] = useState('All Classes');
  const [quota, setQuota] = useState('GENERAL');
  
  // Options for travel classes
  const travelClasses = [
    'All Classes',
    'Sleeper (SL)',
    'AC 3 Tier (3A)',
    'AC 2 Tier (2A)',
    'AC First Class (FC)',
    'Chair Car (CC)',
    'Second Sitting (2S)'
  ];
  
  // Options for quotas
  const quotas = [
    'GENERAL',
    'TATKAL',
    'LADIES',
    'PREMIUM TATKAL',
    'SENIOR CITIZEN'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, date, travelClass, quota });
  };

  // Get today's date in YYYY-MM-DD format for the date input min attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate date 120 days from today for the date input max attribute
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 120);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From Station */}
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <input
              type="text"
              id="from"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Source Station"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* To Station */}
        <div className="relative">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="relative">
            <input
              type="text"
              id="to"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Destination Station"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Date of Journey */}
        <div className="relative">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Journey (DD/MM/YYYY) *
          </label>
          <div className="relative">
            <input
              type="date"
              id="date"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              max={maxDateString}
              required
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Travel Class */}
        <div className="relative">
          <label htmlFor="travelClass" className="block text-sm font-medium text-gray-700 mb-1">
            Travel Class
          </label>
          <div className="relative">
            <select
              id="travelClass"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
            >
              {travelClasses.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Quota */}
      <div className="relative">
        <label htmlFor="quota" className="block text-sm font-medium text-gray-700 mb-1">
          Quota
        </label>
        <div className="relative">
          <select
            id="quota"
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
          >
            {quotas.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Concessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="disability"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="disability" className="ml-2 block text-sm text-gray-700">
            Person With Disability Concession
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="flexibleDate"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="flexibleDate" className="ml-2 block text-sm text-gray-700">
            Flexible With Date
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="berth"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="berth" className="ml-2 block text-sm text-gray-700">
            Train with Available Berth
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="railwayPass"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="railwayPass" className="ml-2 block text-sm text-gray-700">
            Railway Pass Concession
          </label>
        </div>
      </div>

      {/* Search Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition duration-300"
        >
          Search
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
        >
          Easy Booking on AskDISHA
        </button>
      </div>
    </form>
  );
};

export default TrainSearch;