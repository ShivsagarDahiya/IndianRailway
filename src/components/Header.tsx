import { Home, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top header */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2 border-b">
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <img 
                src="data:image/png;base64,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" 
                alt="Indian Railways Logo" 
                className="h-14 w-14 mr-2"
              />
              <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded">REFUND STATUS</div>
            </div>
            <button className="bg-blue-800 text-white px-4 py-1 text-sm rounded">Logout</button>
            <div className="ml-4 text-sm">Welcome User</div>
          </div>
          
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <div className="text-sm">CONTACT US</div>
            <div className="text-sm">HELP & SUPPORT</div>
            <div className="text-sm text-red-600 font-bold">DAILY DEALS</div>
            <div className="text-sm bg-gray-200 px-2 py-1 rounded">ALERTS</div>
            <div className="text-sm">26-Feb-2025 [23:21:15]</div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-between py-2">
          <div className="flex items-center space-x-1">
            <Home size={18} />
            <div className="bg-blue-800 text-white rounded px-3 py-1 text-sm">IRCTC EXCLUSIVE</div>
            <div className="text-orange-500 font-semibold px-3 py-1 text-sm">TRAINS</div>
            <div className="px-3 py-1 text-sm">LOYALTY</div>
            <div className="px-3 py-1 text-sm">IRCTC eWallet</div>
            <div className="px-3 py-1 text-sm">BUSES</div>
            <div className="px-3 py-1 text-sm">FLIGHTS</div>
            <div className="px-3 py-1 text-sm">HOTELS</div>
            <div className="px-3 py-1 text-sm bg-yellow-400  font-bold  rounded">HOLIDAYS</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 text-sm">MY ACCOUNT</div>
            <div className="flex items-center px-3 py-1 text-sm">
              MORE
              <ChevronDown size={16} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;