import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Sleep = () => {
  const [sleepData, setSleepData] = useState([]);
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
          const sleepData = result.data.filter((row) => row["Sleep Total"] !== "NA");
          setSleepData(sleepData);
          calculateWeeklySummary(sleepData);
        },
      }
    );
  };

  const timeToMinutes = (time) => {
    if (time === "NA") return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const calculateWeeklySummary = (data) => {
    const currentWeekData = data.filter((row) => {
      const rowDate = new Date(row.Date);
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the week (Sunday)
      return rowDate >= startOfWeek;
    });

    const totalSleep = currentWeekData.reduce((acc, curr) => acc + timeToMinutes(curr["Sleep Total"] || "00:00"), 0);
    const totalLightSleep = currentWeekData.reduce((acc, curr) => acc + timeToMinutes(curr["Sleep Light"] || "00:00"), 0);
    const totalDeepSleep = currentWeekData.reduce((acc, curr) => acc + timeToMinutes(curr["Sleep Deep"] || "00:00"), 0);
    const totalRemSleep = currentWeekData.reduce((acc, curr) => acc + timeToMinutes(curr["Sleep REM"] || "00:00"), 0);

    const averageSleep = totalSleep / currentWeekData.length;
    const averageLightSleep = totalLightSleep / currentWeekData.length;
    const averageDeepSleep = totalDeepSleep / currentWeekData.length;
    const averageRemSleep = totalRemSleep / currentWeekData.length;

    setWeeklySummary({
      totalSleep: minutesToTime(totalSleep),
      averageSleep: minutesToTime(averageSleep),
      averageLightSleep: minutesToTime(averageLightSleep),
      averageDeepSleep: minutesToTime(averageDeepSleep),
      averageRemSleep: minutesToTime(averageRemSleep),
    });
  };

  return (
    <div>
      <h2>Sleep Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sleep Time</th>
            <th>Sleep Total (hrs)</th>
            <th>Sleep Light (hrs)</th>
            <th>Sleep Deep (hrs)</th>
            <th>Sleep REM (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {sleepData.map((row, index) => (
            <tr key={index}>
              <td>{row.Date}</td>
              <td>{row["Sleep Time"]}</td>
              <td>{row["Sleep Total"] !== "NA" ? row["Sleep Total"] : "N/A"}</td>
              <td>{row["Sleep Light"] !== "NA" ? row["Sleep Light"] : "N/A"}</td>
              <td>{row["Sleep Deep"] !== "NA" ? row["Sleep Deep"] : "N/A"}</td>
              <td>{row["Sleep REM"] !== "NA" ? row["Sleep REM"] : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Weekly Summary</h3>
      <table className="summary-table">
        <tbody>
          <tr>
            <td>Total Sleep this week:</td>
            <td>{weeklySummary.totalSleep} hrs</td>
          </tr>
          <tr>
            <td>Average Sleep Duration this week:</td>
            <td>{weeklySummary.averageSleep} hrs</td>
          </tr>
          <tr>
            <td>Average Light Sleep this week:</td>
            <td>{weeklySummary.averageLightSleep} hrs</td>
          </tr>
          <tr>
            <td>Average Deep Sleep this week:</td>
            <td>{weeklySummary.averageDeepSleep} hrs</td>
          </tr>
          <tr>
            <td>Average REM Sleep this week:</td>
            <td>{weeklySummary.averageRemSleep} hrs</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Sleep;
