import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Weight = () => {
  const [weightData, setWeightData] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState({});

  useEffect(() => {
    fetchCSV();
  }, []);

  const fetchCSV = () => {
    Papa.parse(
      "https://raw.githubusercontent.com/rishabht4/track-it-all/main/data.csv",
      {
        download: true,
        header: true,
        complete: (result) => {
          const weightData = result.data.filter((row) => row["Weight"] !== "NA");
          setWeightData(weightData);
          calculateWeeklySummary(weightData);
        },
      }
    );
  };

  const calculateWeeklySummary = (data) => {
    const currentWeekData = data.filter((row) => {
      const rowDate = new Date(row.Date);
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the week (Sunday)
      return rowDate >= startOfWeek;
    });

    const totalWeight = currentWeekData.reduce((acc, curr) => acc + parseFloat(curr["Weight"] || 0), 0);
    const averageWeight = totalWeight / currentWeekData.length;

    setWeeklySummary({
      averageWeight: averageWeight.toFixed(2),
    });
  };

  return (
    <div>
      <h2>Weight Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {weightData.map((row, index) => (
            <tr key={index}>
              <td>{row.Date}</td>
              <td>{row["Weight"] !== "NA" ? row["Weight"] : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Weekly Summary</h3>
      <table className="summary-table">
        <tbody>
          <tr>
            <td>Average Weight this week:</td>
            <td>{weeklySummary.averageWeight} kg</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Weight;
