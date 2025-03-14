import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

const Workout = () => {
  const [data, setData] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState({
    workouts: 0,
    avgDuration: 'NA',
    avgCalories: 'NA',
    avgHeartRateMean: 'NA',
    avgHeartRateMax: 'NA'
  });

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("https://raw.githubusercontent.com/rishabht4/track-it-all/main/data.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const rows = results.data;
          setData(rows);
          calculateWeeklySummary(rows);
        }
      });
    };

    const calculateWeeklySummary = (rows) => {
      const currentWeekStart = dayjs().startOf('isoWeek');
      const currentWeekEnd = dayjs().endOf('isoWeek');

      const weeklyData = rows.filter((row) => {
        const rowDate = dayjs(row['Date']);
        return rowDate.isValid() && rowDate.isBetween(currentWeekStart, currentWeekEnd, null, '[]');
      });

      if (weeklyData.length > 0) {
        const workouts = weeklyData.filter(row => row['Workout Done?'] === 'Yes').length;
        const avgDuration = calculateAverage(weeklyData, 'Workout Duration');
        const avgCalories = calculateAverage(weeklyData, 'Workout Calories');
        const avgHeartRateMean = calculateAverage(weeklyData, 'Workout Heart Rate Mean');
        const avgHeartRateMax = calculateAverage(weeklyData, 'Workout Heart Rate Max');

        setWeeklySummary({
          workouts,
          avgDuration,
          avgCalories,
          avgHeartRateMean,
          avgHeartRateMax
        });
      }
    };

    const calculateAverage = (data, field) => {
      const validValues = data
        .map(row => parseFloat(row[field]))
        .filter(value => !isNaN(value) && value !== 'NA');
      if (validValues.length === 0) return 'NA';
      return (validValues.reduce((acc, value) => acc + value, 0) / validValues.length).toFixed(2);
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
              <td>{row['Date']}</td>
              <td>{row['Workout Done?']}</td>
              <td>{row['Workout Duration']}</td>
              <td>{row['Workout Calories']}</td>
              <td>{row['Workout Heart Rate Mean']}</td>
              <td>{row['Workout Heart Rate Max']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="weekly-summary-table">
        <thead>
          <tr>
            <th>Weekly Summary</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of workouts this week</td>
            <td>{weeklySummary.workouts}</td>
          </tr>
          <tr>
            <td>Average workout duration this week</td>
            <td>{weeklySummary.avgDuration} minutes</td>
          </tr>
          <tr>
            <td>Average workout calories burned this week</td>
            <td>{weeklySummary.avgCalories} kcal</td>
          </tr>
          <tr>
            <td>Average workout heart rate (mean) this week</td>
            <td>{weeklySummary.avgHeartRateMean} bpm</td>
          </tr>
          <tr>
            <td>Average workout heart rate (max) this week</td>
            <td>{weeklySummary.avgHeartRateMax} bpm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Workout;
