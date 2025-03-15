import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Nutrition = () => {
  const [nutritionData, setNutritionData] = useState([]);
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
            (row) => row["Calories Intake"] !== "NA"
          );
          setNutritionData(filteredData);
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

    const totalCalories = currentWeekData.reduce(
      (acc, curr) => acc + parseFloat(curr["Calories Intake"] || 0),
      0
    );
    const totalProtein = currentWeekData.reduce(
      (acc, curr) => acc + parseFloat(curr["Protein Intake"] || 0),
      0
    );

    const avgCalories = totalCalories / currentWeekData.length;
    const avgProtein = totalProtein / currentWeekData.length;

    setWeeklySummary({
      avgCalories: avgCalories.toFixed(2),
      avgProtein: avgProtein.toFixed(2),
    });
  };

  return (
    <div>
      <h2>Nutrition Data</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Calories Intake (kcal)</th>
            <th>Protein Intake (g)</th>
          </tr>
        </thead>
        <tbody>
          {nutritionData.map((row, index) => (
            <tr key={index}>
              <td>{row.Date}</td>
              <td>{row["Calories Intake"] !== "NA" ? row["Calories Intake"] : "N/A"}</td>
              <td>{row["Protein Intake"] !== "NA" ? row["Protein Intake"] : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Weekly Summary</h3>
      <table className="summary-table">
        <tbody>
          <tr>
            <td>Average Calories Intake this week:</td>
            <td>{weeklySummary.avgCalories} kcal</td>
          </tr>
          <tr>
            <td>Average Protein Intake this week:</td>
            <td>{weeklySummary.avgProtein} g</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Nutrition;
