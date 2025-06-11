import React, { useState, useEffect } from 'react';
import { Search, Filter, Menu, X, RefreshCw, Bell } from 'lucide-react';

const SharkBettingClone = () => {
  const [refreshTimer, setRefreshTimer] = useState(19);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    draw: true,
    live: false,
    '1x2': true,  
    ou: false,
    handicap: false
  });

  // Données simulées basées sur l'interface SharkBetting
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers",
      rating: 94,
      bookmaker: "BETONLINE",
      odds: 2.83,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 61
    },
    {
      id: 2,
      time: "Tomorrow", 
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers",
      rating: 93,
      bookmaker: "betsafe",
      odds: 2.80,
      exchange: "ORBITX", 
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 60
    },
    {
      id: 3,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers", 
      bet: "Indiana Pacers",
      rating: 93,
      bookmaker: "ibet",
      odds: 2.80,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 60
    },
    {
      id: 4,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers", 
      rating: 93,
      bookmaker: "betsson",
      odds: 2.80,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 60
    },
    {
      id: 5,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers",
      rating: 93,
      bookmaker: "bet365",
      odds: 2.80,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357", 
      freeBetRating: 60
    },
    {
      id: 6,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers",
      rating: 92,
      bookmaker: "Kambi",
      odds: 2.75,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 58
    },
    {
      id: 7,
      time: "Tomorrow", 
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers",
      rating: 91,
      bookmaker: "BOOBET",
      odds: 2.72,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 57
    },
    {
      id: 8,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers", 
      bet: "Indiana Pacers",
      rating: 91,
      bookmaker: "ROLLBIT",
      odds: 2.72,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 57
    },
    {
      id: 9,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers",
      rating: 90,
      bookmaker: "Danske Spil",
      odds: 2.70,
      exchange: "ORBITX", 
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 57
    },
    {
      id: 10,
      time: "Tomorrow",
      match: "Indiana Pacers - Indiana Pacers",
      bet: "Indiana Pacers",
      rating: 91,
      bookmaker: "BC.GAME",
      odds: 2.72,
      exchange: "ORBITX",
      layOdds: 3.00,
      available: "€357",
      freeBetRating: 57
    }
  ]);

  // Timer de rafraîchissement
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTimer(prev => {
        if (prev <= 1) {
          return 19; // Reset à 19 secondes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getBookmakerLogo = (bookmaker) => {
    const logos = {
      'BETONLINE': 'bg-red-600',
      'betsafe': 'bg-black',
      'ibet': 'bg-red-500',
      'betsson': 'bg-orange-500',
      'bet365': 'bg-green-600',
      'Kambi': 'bg-blue-600',
      'BOOBET': 'bg-yellow-500',
      'ROLLBIT': 'bg-black',
      'Danske Spil': 'bg-green-700',
      'BC.GAME': 'bg-green-500'
    };
    return logos[bookmaker] || 'bg-gray-500';
  };

  const FilterModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isFilterOpen ? 'block' : 'hidden'}`}>
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Default alert</h3>
            <button onClick={() => setIsFilterOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Bookmaker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bookmaker (12)</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Choose...</option>
              </select>
            </div>

            {/* League */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">League</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Choose...</option>
              </select>
            </div>

            {/* Odds Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Odds</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">1.0</span>
                <div className="flex-1 relative">
                  <input type="range" min="1" max="10" className="w-full" />
                </div>
                <span className="text-sm">10+</span>
              </div>
            </div>

            {/* Rating Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">95</span>
                <div className="flex-1 relative">
                  <input type="range" min="95" max="110" className="w-full" />
                </div>
                <span className="text-sm">110+</span>
              </div>
            </div>

            {/* Available */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Choose...</option>
              </select>
            </div>

            {/* Periods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Periods</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>5 days</option>
              </select>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show draw</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="draw" defaultChecked className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="draw" className="mr-2" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show live matches</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="live" className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="live" defaultChecked className="mr-2" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show 1X2</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="1x2" defaultChecked className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="1x2" className="mr-2" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show O/U</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="ou" defaultChecked className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="ou" className="mr-2" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show Handicap</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="handicap" defaultChecked className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="handicap" className="mr-2" />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Turn Alarm On</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="alarm" className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="alarm" defaultChecked className="mr-2" />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-6">
              <button className="px-6 py-2 bg-gray-800 text-white rounded-md">Reset alerts</button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Save alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Oddsmatcher</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Refresh in {refreshTimer} secs</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            draw: ✓
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            live: ✗
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            1x2: ✓
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ou: ✗
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            handicap: ✗
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            odds: 1 to 10
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            rating: 90 to 110
          </span>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for match, date, odds..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>Choose...</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>Bookmaker (12)</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>Choose...</option>
          </select>
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Filter
          </button>
          
          <button 
            onClick={() => setIsAlertOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Alert
          </button>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bet <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookmaker <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Odds <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exchange
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lay <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available <span className="ml-1">↕</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Free Bet Rating <span className="ml-1">↓</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {opp.time}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs">⚽</span>
                        </div>
                        <span className="text-sm text-gray-900">{opp.match}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {opp.bet}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
                        {opp.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded text-white text-xs font-medium ${getBookmakerLogo(opp.bookmaker)}`}>
                        {opp.bookmaker}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {opp.odds}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center px-3 py-1 rounded bg-gray-100 text-gray-800 text-xs font-medium">
                        ORBITX
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        {opp.layOdds}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {opp.available}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {opp.freeBetRating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-gray-400 hover:text-gray-600">
                        <span className="text-lg">📋</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing 1 to 10 of 24 results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">First</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Previous</button>
              <span className="text-sm text-gray-700">Page</span>
              <input type="number" value="1" className="w-12 px-2 py-1 text-sm border border-gray-300 rounded text-center" />
              <span className="text-sm text-gray-700">of 3</span>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Next</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Last</button>
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-sm text-gray-700">Page size:</span>
                <select className="px-2 py-1 text-sm border border-gray-300 rounded">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterModal />
    </div>
  );
};

export default SharkBettingClone;