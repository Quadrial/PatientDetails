import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DiagnosticList from "./DiagnosticList";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const History = ({ diagnosisHistory }) => {
  const [chartData, setChartData] = useState({});
  const [timeframe, setTimeframe] = useState("6"); // default to last 6 months
  const [selectedData, setSelectedData] = useState(null); // Selected systolic and diastolic data

  // Update chart data and selected data when diagnosisHistory or timeframe changes
  useEffect(() => {
    if (diagnosisHistory && diagnosisHistory.length > 0) {
      // Filter data based on the selected timeframe
      const filteredData = diagnosisHistory.slice(
        0,
        timeframe === "6"
          ? 6
          : timeframe === "4"
          ? 4
          : timeframe === "2"
          ? 2
          : 1
      );

      // Prepare chart data
      const months = filteredData.map(
        (entry) => `${entry.month} ${entry.year}`
      );
      const systolicData = filteredData.map(
        (entry) => entry.blood_pressure.systolic.value
      ); // Systolic blood pressure
      const diastolicData = filteredData.map(
        (entry) => entry.blood_pressure.diastolic.value
      ); // Diastolic blood pressure

      setChartData({
        labels: months,
        datasets: [
          {
            label: "Systolic Blood Pressure",
            data: systolicData,
            fill: false,
            borderColor: "#C26EB4",
            tension: 0.1,
          },
          {
            label: "Diastolic Blood Pressure",
            data: diastolicData,
            fill: false,
            borderColor: "#8C6FE6",
            tension: 0.1,
          },
        ],
      });

      // Set the most recent data point for systolic and diastolic
      setSelectedData(filteredData[filteredData.length - 1]);
    }
  }, [diagnosisHistory, timeframe]); // Re-run effect when diagnosisHistory or timeframe changes

  // Calculate average of systolic and diastolic values
  const calculateAverage = (data) => {
    const totalSystolic = data.reduce(
      (acc, entry) => acc + entry.blood_pressure.systolic.value,
      0
    );
    const totalDiastolic = data.reduce(
      (acc, entry) => acc + entry.blood_pressure.diastolic.value,
      0
    );
    return {
      avgSystolic: totalSystolic / data.length,
      avgDiastolic: totalDiastolic / data.length,
    };
  };

  // Determine whether the value is "Higher", "Lower", or "Normal"
  const getBloodPressureStatus = (value, avgValue) => {
    if (value > avgValue) return "Higher than Average";
    if (value < avgValue) return "Lower than Average";
    return "Normal";
  };

  if (!selectedData) return <p>Loading...</p>;

  // Calculate averages for the selected data
  const { avgSystolic, avgDiastolic } = calculateAverage(
    diagnosisHistory.slice(
      0,
      timeframe === "6" ? 6 : timeframe === "4" ? 4 : timeframe === "2" ? 2 : 1
    )
  );

  // Get the status for the selected systolic and diastolic values
  const systolicStatus = getBloodPressureStatus(
    selectedData.blood_pressure.systolic.value,
    avgSystolic
  );
  const diastolicStatus = getBloodPressureStatus(
    selectedData.blood_pressure.diastolic.value,
    avgDiastolic
  );

  return (<>
    <section className="bg-white rounded-lg px-5 py-5 w-[50vw] h-[73vh]">
      <h2 className="text-[22px] font-semibold">Diagnosis History</h2>

      <main className="flex flex-row mt-7 gap-5 py-3 px-10 rounded-lg h-[42vh] bg-custom-gray-light-3">
        {/* Blood Pressure Chart Section */}
        <section className="flex flex-col gap-1 w-[35vw]">
          <div className="flex justify-between items-center">
            <h2 className="text-[22px] font-semibold">Blood Pressure</h2>
            <select
              className="bg-transparent mr-10 px-2 py-1"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)} // Update the timeframe
            >
              <option value="6">Last 6 months</option>
              <option value="4">Last 4 months</option>
              <option value="2">Last 2 months</option>
              <option value="1">Last month</option>
            </select>
          </div>

          {/* Chart */}
          <div className="">
            {chartData.labels ? (
              <Line data={chartData} />
            ) : (
              <p>No diagnosis history available.</p>
            )}
          </div>
        </section>

        {/* Display the selected systolic and diastolic values */}
        <main className="flex flex-col gap-2">
          {/* Systolic */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="bg-custom-pink-light w-3 h-3 rounded-full"></h1>
              <h2 className="text-[20px] font-semibold">Systolic</h2>
            </div>

            <p className="text-[24px] font-bold">
              {selectedData.blood_pressure.systolic.value}
            </p>
            <p>{systolicStatus}</p>
          </div>

          {/* Diastolic */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="bg-custom-purple w-3 h-3 rounded-full"></h1>
              <h2 className="text-[20px] font-semibold">Diastolic</h2>
            </div>
            <p className="text-[24px] font-bold">
              {selectedData.blood_pressure.diastolic.value}
            </p>
            <p>{diastolicStatus}</p>
          </div>
        </main>
      </main>

      <main className="flex flex-row gap-[57px] mt-5 mb-5">
        <figure className="bg-custom-light-blue rounded-lg w-[14vw] p-4 px-10 h-[18vh]">
          <img src="images/respiratory rate.svg" alt="" className="w-[30%]"/>
          <h2>Respiratory Rate</h2>
          <p className="text-[22px] font-semibold">
            {selectedData.respiratory_rate.value}{" "}
            {selectedData.respiratory_rate.unit} bpm
          </p>
          <p>{diastolicStatus}</p>
        </figure>
        <figure className="bg-custom-light-pink rounded-lg w-[14vw] p-4 px-10 h-[18vh]">
          <img src="images/temperature.svg" alt="" className="w-[30%]"/>
          <h2>Temperature</h2>
          <p className="text-[22px] font-semibold">
            {selectedData.temperature.value} F
          </p>
          <p>{diastolicStatus}</p>
        </figure>
        <figure className="bg-custom-pink rounded-lg w-[14vw] p-4 px-10 h-[18vh]">
          <img src="images/HeartBPM.svg" alt="" className="w-[30%]"/>
          <h2>Heart Rate</h2>
          <p className="text-[22px] font-semibold">
            {selectedData.heart_rate.value} bpm
          </p>
          <p>{diastolicStatus}</p>
        </figure>
      </main>
      
    </section>

    </>);
};

export default History;
