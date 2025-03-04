import React, { useState } from "react";

const PNRStatus: React.FC = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [pnrData, setPnrData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Replace with your actual API key

  const fetchPNRStatus = async () => {
    // Validate PNR Number (10-digit check)
    if (!/^\d{10}$/.test(pnrNumber)) {
      setError("Invalid PNR Number! Enter a 10-digit PNR.");
      return;
    }

    setLoading(true);
    setError(null);
    setPnrData(null);

    try {
      const response = await fetch(
        `https://real-time-pnr-status-api-for-indian-railways.p.rapidapi.com/disha/${pnrNumber}`,
        {
          method: "GET",
          headers: {
            // "Accept": "application/json",
            "x-rapidapi-key": 'ed2e205d5bmsh82cc3ef19cd616dp100d40jsn640c1bca65b1',
            "x-rapidapi-host": "real-time-pnr-status-api-for-indian-railways.p.rapidapi.com",
          },
        }
      );

      console.log("Response Status:", response.status);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (!data || Object.keys(data).length === 0) {
        throw new Error("No data found for the entered PNR.");
      }

      setPnrData(data);
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.message || "Failed to fetch PNR status. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-left justify-center p-4">
      <div className="w-full max-w-md p-4 shadow-lg rounded-2xl border">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Check PNR Status</h2>
          <input
            type="text"
            placeholder="Enter PNR Number"
            value={pnrNumber}
            onChange={(e) => setPnrNumber(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button
            onClick={fetchPNRStatus}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-dark font-semibold rounded"
          >
            {loading ? "Checking..." : "Check PNR"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {pnrData && (
            <div className="mt-4 p-4 border rounded-lg shadow-md bg-gray-100">
            <h3 className="text-lg font-semibold text-center mb-3">PNR Details</h3>
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
              <tbody>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-2 font-semibold">Train Name</td>
                  <td className="border border-gray-300 p-2">{pnrData.trainName || "N/A"}</td>
                  <td className="border border-gray-300 p-2 font-semibold">Train Number</td>
                  <td className="border border-gray-300 p-2">{pnrData.trainNum || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Journey Date</td>
                  <td className="border border-gray-300 p-2">{pnrData.arrivalDate || "N/A"}</td>
                  <td className="border border-gray-300 p-2 font-semibold">Current Journey Class</td>
                  <td className="border border-gray-300 p-2">{pnrData.journeyClass || "N/A"}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 p-2 font-semibold">Passengers</td>
                  <td className="border border-gray-300 p-2">{pnrData.noOfPassenger || "N/A"}</td>
                  <td className="border border-gray-300 p-2 font-semibold">Boarding Point</td>
                  <td className="border border-gray-300 p-2">{pnrData.boardingPoint || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Station From</td>
                  <td className="border border-gray-300 p-2">{pnrData.stationFrom || "N/A"}</td>
                  <td className="border border-gray-300 p-2 font-semibold">Station To</td>
                  <td className="border border-gray-300 p-2">{pnrData.stationTo || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default PNRStatus;
