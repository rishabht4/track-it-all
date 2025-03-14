import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Workout = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/rishabht4/track-it-all/main/data.csv"
      );
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    };

    fetchCSV();
  }, []);

  return (
    <div>
      <h1>Workout Data</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Workout Done?</th>
            <th>Workout Duration</th>
            <th>Workout Calories</th>
            <th>Workout HR Mean</th>
            <th>Workout HR Max</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row["Date"]}</td>
              <td>{row["Workout Done?"]}</td>
              <td>{row["Workout Duration"]}</td>
              <td>{row["Workout Calories"]}</td>
              <td>{row["Workout Heart Rate Mean"]}</td>
              <td>{row["Workout Heart Rate Max"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workout;
