import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const RestingHeartRate = () => {
  const [restingHeartRateData, setRestingHeartRateData] = useState([]);
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
          const filteredData = result.data.filter(
            (row) => row["Resting Heart Rate at 10am"] !== "NA"
          );
          setRestingHeartRateData(filteredData);
          calculateWeeklySummary(filteredData);
        },
      }
    );
  };

  const calculateWeeklySummary = (data) => {
    const currentWeekData = data.filter((row) => {
      const rowDate = new Date(row.Date);
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      return rowDate >= startOfWeek;
    });

    const total10amHeartRate = currentWeekData.reduce(
      (acc, curr) => acc + parseFloat(curr["Resting Heart Rate at 10am"] || 0),
      0
    );
    const total4pmHeartRate = currentWeekData.reduce(
      (acc, curr) => acc + parseFloat(curr["Resting Heart Rate at 4pm"] || 0),
      0
    );
    const total9pmHeartRate = currentWeekData.reduce(
      (acc, curr) => acc + parseFloat(curr["Resting Heart Rate at 9pm"] || 0),
      0
    );

    const avg10amHeartRate = total10amHeartRate / currentWeekData.length;
    const avg4pmHeartRate = total4pmHeartRate / currentWeekData.length;
    const avg9pmHeartRate = total9pmHeartRate / currentWeekData.length;

    setWeeklySummary({
      avg10amHeartRate: avg10amHeartRate.toFixed(2),
      avg4pmHeartRate: avg4pmHeartRate.toFixed(2),
      avg9pmHeartRate: avg9pmHeartRate.toFixed(2),
    });
  };

  return (
    <div>
      <h2>Resting Heart Rate Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Resting Heart Rate at 10am (bpm)</th>
            <th>Resting Heart Rate at 4pm (bpm)</th>
            <th>Resting Heart Rate at 9pm (bpm)</th>
          </tr>
        </thead>
        <tbody>
          {restingHeartRateData.map((row, index) => (
            <tr key={index}>
              <td>{row.Date}</td>
              <td>{row["Resting Heart Rate at 10am"] !== "NA" ? row["Resting Heart Rate at 10am"] : "N/A"}</td>
              <td>{row["Resting Heart Rate at 4pm"] !== "NA" ? row["Resting Heart Rate at 4pm"] : "N/A"}</td>
              <td>{row["Resting Heart Rate at 9pm"] !== "NA" ? row["Resting Heart Rate at 9pm"] : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Weekly Summary</h3>
      <table className="summary-table">
        <tbody>
          <tr>
            <td>Average Resting Heart Rate at 10am this week:</td>
            <td>{weeklySummary.avg10amHeartRate} bpm</td>
          </tr>
          <tr>
            <td>Average Resting Heart Rate at 4pm this week:</td>
            <td>{weeklySummary.avg4pmHeartRate} bpm</td>
          </tr>
          <tr>
            <td>Average Resting Heart Rate at 9pm this week:</td>
            <td>{weeklySummary.avg9pmHeartRate} bpm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestingHeartRate;
