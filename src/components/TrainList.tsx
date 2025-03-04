import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, Calendar, CreditCard, AlertCircle, Shield, Info, ChevronDown } from 'lucide-react';

interface TrainClass {
  type: string;
  available: string;
  fare: number;
}

interface Train {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  days: string[];
  classes: TrainClass[];
}

interface TrainListProps {
  from: string;
  to: string;
  date: string;
  travelClass: string;
}


// ending somethigs

const TrainList: React.FC<TrainListProps> = ({ from, to, date, travelClass }) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch trains
    setTimeout(() => {
      setTrains(mockTrains);
      setLoading(false);
    }, 1000);
  }, [from, to, date]);

  const toggleTrainSelection = (trainId: string) => {
    setSelectedTrain(selectedTrain === trainId ? null : trainId);
  };

  const toggleDetails = (trainId: string) => {
    setExpandedDetails(expandedDetails === trainId ? null : trainId);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getAvailabilityColor = (available: string) => {
    if (available.includes('AVAILABLE')) return 'text-green-600';
    if (available.includes('RAC')) return 'text-orange-500';
    if (available.includes('WAITING')) return 'text-red-600';
    return 'text-gray-700';
  };

  // Mock data for trains
  const mockTrains: Train[] = [
    {
      id: '12301',
      name: 'Rajdhani Express',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departureTime: '16:10',
      arrivalTime: '10:05',
      duration: '17h 55m',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: [
        { type: 'SL', available: 'AVAILABLE 45', fare: 755 },
        { type: '3A', available: 'AVAILABLE 21', fare: 1985 },
        { type: '2A', available: 'AVAILABLE 15', fare: 2865 },
        { type: '1A', available: 'AVAILABLE 3', fare: 4830 }
      ]
    },
    {
      id: '12259',
      name: 'Sealdah Duronto',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departureTime: '12:40',
      arrivalTime: '03:55',
      duration: '15h 15m',
      days: ['Mon', 'Wed', 'Fri'],
      classes: [
        { type: 'SL', available: 'AVAILABLE 120', fare: 675 },
        { type: '3A', available: 'AVAILABLE 45', fare: 1765 },
        { type: '2A', available: 'RAC 5', fare: 2565 }
      ]
    },
    {
      id: '12303',
      name: 'Poorva Express',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departureTime: '08:35',
      arrivalTime: '07:05',
      duration: '22h 30m',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: [
        { type: 'SL', available: 'WAITING LIST 24', fare: 510 },
        { type: '3A', available: 'AVAILABLE 12', fare: 1345 },
        { type: '2A', available: 'AVAILABLE 8', fare: 1965 }
      ]
    },
    {
      id: '12305',
      name: 'Howrah Mail',
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departureTime: '21:50',
      arrivalTime: '19:30',
      duration: '21h 40m',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      classes: [
        { type: 'SL', available: 'AVAILABLE 85', fare: 495 },
        { type: '3A', available: 'AVAILABLE 32', fare: 1295 },
        { type: '2A', available: 'AVAILABLE 18', fare: 1895 }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
        <span className="ml-3 text-lg text-gray-700">Searching for trains...</span>
      </div>
    );
  }

  if (trains.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto text-yellow-500 mb-2" size={40} />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Trains Found</h3>
        <p className="text-gray-600">
          We couldn't find any trains matching your search criteria. Please try different dates or stations.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <Info className="text-blue-600 mr-2" size={20} />
          <p className="text-blue-800">
            Showing trains from <span className="font-semibold">{from}</span> to <span className="font-semibold">{to}</span> on <span className="font-semibold">{formatDate(date)}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {trains.map((train) => (
          <div key={train.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Train header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-blue-800">{train.id}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-lg font-semibold text-gray-800">{train.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar size={14} className="mr-1" />
                    <span>Runs on: {train.days.join(', ')}</span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Shield size={12} className="mr-1" />
                    IRCTC Assured
                  </span>
                </div>
              </div>
            </div>

            {/* Train details */}
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Departure */}
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-gray-800">{train.departureTime}</div>
                  <div className="text-sm text-gray-500">{train.from}</div>
                </div>

                {/* Duration */}
                <div className="flex flex-col items-center my-2 md:my-0">
                  <div className="text-xs text-gray-500 mb-1">{train.duration}</div>
                  <div className="relative w-24 md:w-32">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300"></div>
                    <ArrowRight className="relative mx-auto text-gray-500" size={20} />
                  </div>
                </div>

                {/* Arrival */}
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-gray-800">{train.arrivalTime}</div>
                  <div className="text-sm text-gray-500">{train.to}</div>
                </div>
              </div>

              {/* Classes and availability */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                {train.classes.map((cls) => (
                  <div 
                    key={cls.type} 
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedTrain === train.id && travelClass.includes(cls.type) ? 
                      'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => toggleTrainSelection(train.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-semibold text-gray-800">
                        {cls.type === 'SL' && 'Sleeper'}
                        {cls.type === '3A' && 'AC 3 Tier'}
                        {cls.type === '2A' && 'AC 2 Tier'}
                        {cls.type === '1A' && 'AC First Class'}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">₹{cls.fare}</div>
                      </div>
                    </div>
                    <div className={`text-sm mt-1 ${getAvailabilityColor(cls.available)}`}>
                      {cls.available}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
                <button 
                  className="text-blue-600 text-sm flex items-center mb-2 md:mb-0"
                  onClick={() => toggleDetails(train.id)}
                >
                  {expandedDetails === train.id ? 'Hide Details' : 'Train Details'}
                  <ChevronDown className={`ml-1 transition-transform ${expandedDetails === train.id ? 'rotate-180' : ''}`} size={16} />
                </button>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium">
                    Tatkal Booking
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expandedDetails === train.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Train Schedule</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Distance:</span>
                          <span className="font-medium">1,452 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pantry:</span>
                          <span className="font-medium text-green-600">Available</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rake Type:</span>
                          <span className="font-medium">LHB</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Catering</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Veg Meal:</span>
                          <span className="font-medium">₹80</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Non-Veg Meal:</span>
                          <span className="font-medium">₹90</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Breakfast:</span>
                          <span className="font-medium">₹50</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Route Information</h4>
                      <div className="text-sm text-gray-600">
                        <p>Major stations: {train.from}, GZB, CNB, ALD, MGS, DDU, {train.to}</p>
                        <p className="mt-1">Total stops: 12</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-center">
          <CreditCard className="text-blue-600 mr-2" size={20} />
          <p className="text-blue-800">
            <span className="font-semibold">Payment Options:</span> Credit/Debit Card, UPI, Net Banking, IRCTC eWallet
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainList;