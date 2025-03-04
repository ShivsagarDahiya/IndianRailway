import { useState } from 'react';
import { MapPin, Ticket, RotateCcw, BarChart3 } from 'lucide-react';
import TrainSearch from './components/TrainSearch';
import TrainList from './components/TrainList';
import Header from './components/Header';

interface SearchParams {
  from: string;
  to: string;
  date: string;
  travelClass: string;
  quota: string;
}

function App() {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    date: '',
    travelClass: 'All Classes',
    quota: 'GENERAL'
  });

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setSearchPerformed(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* <div className="flex flex-row gap-4 justify-center items-start">
  <PNRStatus />
  <TrainInfo />
</div> */}

      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex items-center justify-center bg-blue-800 text-white py-3 rounded">
                <Ticket className="mr-2" size={20} />
                <span className="font-semibold">PNR STATUS</span>
              </div>
              <div className="flex items-center justify-center bg-blue-800 text-white py-3 rounded mt-2">
                <RotateCcw className="mr-2" size={20} />
                <span className="font-semibold">Refund Status</span>
              </div>
              <div className="flex items-center justify-center bg-blue-800 text-white py-3 rounded mt-2">
                <BarChart3 className="mr-2" size={20} />
                <span className="font-semibold">CHARTS / VACANCY</span>
              </div>
              <div className="flex items-center justify-center bg-blue-800 text-white py-3 rounded mt-2">
                <MapPin className="mr-2" size={20} />
                <span className="font-semibold">Re-Book Journey</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">BOOK TICKET</h2>
              <TrainSearch onSearch={handleSearch} />
            </div>

            {searchPerformed && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Trains from {searchParams.from} to {searchParams.to} on {searchParams.date}
                </h3>
                <TrainList from={searchParams.from} to={searchParams.to} date={searchParams.date} travelClass={searchParams.travelClass} />
              </div>
            )}
          </div>
          
        </div>
        
      </main>

      <footer className="bg-blue-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-2">Customer Care Numbers: 14646/08044647999</p>
            <p className="text-sm">
              BEWARE OF FRAUDSTERS: Always download official Indian Rail Connect App from the Google Play Store or Apple App Store only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;