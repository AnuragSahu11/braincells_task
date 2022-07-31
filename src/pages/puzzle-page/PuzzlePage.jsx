import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PuzzleDraggable } from "./components/PuzzleDraggable";
import "./puzzlepage.css";

const PuzzlePage = () => {
  const navigate = useNavigate();
  const puzzleData = require("../../puzzle-data/puzzle-data.json").puzzledata;
  const { background, data } = puzzleData;

  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (score === data.length) {
      setTimeout(() => {
        setGameWon(true);
      }, 1000);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, [score]);

  return (
    <div className="puzzle_page">
      <div className="puzzle_container">
        <div className="puzzle_background">
          <img draggable="false" src={background} alt="" />
        </div>
        <div className="puzzle_draggable_wrapper">
          {data.map((item) => (
            <PuzzleDraggable data={item} setScore={setScore} />
          ))}
        </div>
      </div>
      {gameWon && <div className="puzzle_page_modal"></div>}
    </div>
  );
};

export { PuzzlePage };
