// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Workout from "./pages/Workout";
import Sleep from "./pages/Sleep";
import Nutrition from "./pages/Nutrition";
import RestingHeartRate from "./pages/RestingHeartRate";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/workout">Workout</Link></li>
            <li><Link to="/sleep">Sleep</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
            <li><Link to="/resting-heart-rate">Resting Heart Rate</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/workout" element={<Workout />} />
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/resting-heart-rate" element={<RestingHeartRate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
