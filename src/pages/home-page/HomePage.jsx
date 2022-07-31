import "./homepage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/welcome");
  };

  return (
    <div className="homepage">
      <button onClick={clickHandler} className="homepage_button">
        Start Photoplay
      </button>
    </div>
  );
};

export { HomePage };
