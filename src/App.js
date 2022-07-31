import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home-page/HomePage";
import { PuzzlePage } from "./pages/puzzle-page/PuzzlePage";
import { WelcomePage } from "./pages/welcome-page/WelcomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
      </Routes>
    </div>
  );
}

export default App;
