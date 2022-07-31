import "./homepage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/welcome");
  };

  useEffect(() => {
    document.title = "BrainCells PhotoPlay";
  }, []);

  return (
    <div className="homepage">
      <button onClick={clickHandler} className="homepage_button">
        Start Photoplay
      </button>
    </div>
  );
};

export { HomePage };
