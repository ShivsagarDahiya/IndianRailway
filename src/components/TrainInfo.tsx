import React, { useState } from "react";

const TrainInfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Stores user input for train name/number
  const [trainData, setTrainData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API key should be stored in .env file
  const API_KEY = 'ed2e205d5bmsh82cc3ef19cd616dp100d40jsn640c1bca65b1'; // Ensure this is set in your .env file

  const fetchTrainInfo = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a train name or number.");
      return;
    }

    setLoading(true);
    setError(null);
    setTrainData(null);

    try {
      const response = await fetch(
        `https://indian-railway-irctc.p.rapidapi.com/api/trains-search/v1/train/${encodeURIComponent(searchTerm)}?isH5=true&client=web`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": API_KEY || "",
            "x-rapidapi-host": "indian-railway-irctc.p.rapidapi.com",
            "Accept": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!data?.trains || data.trains.length === 0) {
        throw new Error("No train data found.");
      }

      setTrainData(data.trains[0]); // Extracting the first matching train's details
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch train data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">Train Information</h2>

        {/* Search Input */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter Train Name or Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-full focus:ring focus:ring-blue-300"
            disabled={loading}
          />
          <button
            onClick={fetchTrainInfo}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Fetching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {trainData && (
          <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border border-gray-300 p-3 font-semibold">Train Name</td>
                <td className="border border-gray-300 p-3">{trainData.trainName || "N/A"}</td>
                <td className="border border-gray-300 p-3 font-semibold">Train Number</td>
                <td className="border border-gray-300 p-3">{trainData.trainNumber || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">Origin</td>
                <td className="border border-gray-300 p-3">{trainData.origin?.stationName || "N/A"}</td>
                <td className="border border-gray-300 p-3 font-semibold">Destination</td>
                <td className="border border-gray-300 p-3">{trainData.destination?.stationName || "N/A"}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border border-gray-300 p-3 font-semibold">Station From</td>
                <td className="border border-gray-300 p-3">{trainData.stationFrom?.stationName || "N/A"}</td>
                <td className="border border-gray-300 p-3 font-semibold">Station To</td>
                <td className="border border-gray-300 p-3">{trainData.stationTo?.stationName || "N/A"}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-semibold">Running Days</td>
                <td className="border border-gray-300 p-3" colSpan={3}>
                  {trainData.runningOn?.join(", ") || "N/A"}
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border border-gray-300 p-3 font-semibold">Journey Classes</td>
                <td className="border border-gray-300 p-3" colSpan={3}>
                  {trainData.journeyClasses?.join(", ") || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TrainInfo;
