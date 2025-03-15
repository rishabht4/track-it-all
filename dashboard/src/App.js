import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Weight from "./pages/Weight";
import Workout from "./pages/Workout";
import Sleep from "./pages/Sleep";
import Nutrition from "./pages/Nutrition";
import RestingHeartRate from "./pages/RestingHeartRate";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="horizontal-menu">
          <ul>
            <li><Link to="/weight">Weight</Link></li>
            <li><Link to="/workout">Workout</Link></li>
            <li><Link to="/sleep">Sleep</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
            <li><Link to="/resting-heart-rate">Resting Heart Rate</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/weight" element={<Weight />} />
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
