import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home-page/HomePage";
import { PuzzlePage } from "./pages/puzzle-page/PuzzlePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
      </Routes>
    </div>
  );
}

export default App;
