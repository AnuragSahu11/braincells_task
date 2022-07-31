import { useState } from "react";
import Bounce from "react-reveal/Bounce";
import Jump from "react-reveal/Jump";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="welcome_page">
      <Jump spy={showAnimation}>
        <Bounce top cascade delay={500}>
          Welcome to
        </Bounce>
        <Bounce left cascade delay={1500}>
          Photoplay
        </Bounce>
        <Bounce
          bottom
          onReveal={() => {
            setTimeout(() => {
              setShowAnimation(true);
            }, 3500);
            setTimeout(() => {
              navigate("/puzzle");
            }, 7000);
          }}
          cascade
          delay={2500}
        >
          Photoplay
        </Bounce>
      </Jump>

      {showAnimation && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
};

export { WelcomePage };
