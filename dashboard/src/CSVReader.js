import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const CSVReader = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch CSV from your GitHub repo
    const fetchCSV = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/rishabht4/track-it-all/main/data.csv"
      );
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    };

    fetchCSV();
  }, []);

  return (
    <div>
      <h1>CSV Data</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Workout Done?</th>
            <th>Workout Calories</th>
            <th>Workout HR Mean</th>
            <th>Workout HR Max</th>
            <th>Resting HR (10am)</th>
            <th>Resting HR (4pm)</th>
            <th>Resting HR (9pm)</th>
            <th>Sleep Total</th>
            <th>Sleep Light</th>
            <th>Sleep Deep</th>
            <th>Sleep REM</th>
            <th>Calories Intake</th>
            <th>Protein Intake</th>
            <th>Cardio Calories</th>
            <th>Cardio HR Max</th>
            <th>Cardio HR Mean</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVReader;
