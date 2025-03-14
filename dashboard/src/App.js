import { Link } from "react-router-dom";
import "./App.css"; // Add custom styles

function App() {
  return (
    <div className="App">
      <nav className="horizontal-menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/workout">Workout</Link></li>
          <li><Link to="/sleep">Sleep</Link></li>
          <li><Link to="/nutrition">Nutrition</Link></li>
          <li><Link to="/resting-heart-rate">Resting Heart Rate</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
