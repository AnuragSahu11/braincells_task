import { useEffect } from "react";
import { useState } from "react";
import Jump from "react-reveal/Jump";
import Tada from "react-reveal/Tada";
import { useNavigate } from "react-router-dom";
import { PuzzleDraggable } from "./components/PuzzleDraggable";
import "./puzzlepage.css";

const PuzzlePage = () => {
  const navigate = useNavigate();
  const puzzleData = require("../../puzzle-data/puzzle-data.json").puzzledata;
  const { background, data } = puzzleData;

  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [loadCount, setLoadCount] = useState(data.length + 1);

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
      {loadCount > 0 && (
        <div className="loader">
          <p>Loading</p>
        </div>
      )}
      <div className="puzzle_container">
        <div className="puzzle_background">
          <img
            draggable="false"
            src={background}
            onLoad={() => setLoadCount((prevState) => prevState - 1)}
            alt=""
          />
        </div>
        <div className="puzzle_draggable_wrapper">
          {data.map((item) => (
            <PuzzleDraggable
              data={item}
              setScore={setScore}
              setLoadCount={setLoadCount}
              loadCount={loadCount}
            />
          ))}
        </div>
      </div>
      {gameWon && (
        <div className="puzzle_page_modal">
          <div className="puzzle_page_modal_images">
            {data
              .reduce((acc, crr) => {
                return [...acc, crr.img];
              }, [])
              .map((img) => (
                <Jump>
                  <img src={img} />
                </Jump>
              ))}
          </div>
          <div className="puzzle_page_modal_text">
            <Tada>Well Done!</Tada>
          </div>
        </div>
      )}
    </div>
  );
};

export { PuzzlePage };
