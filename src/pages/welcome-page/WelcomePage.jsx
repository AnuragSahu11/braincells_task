import { useEffect, useState } from "react";
import Bounce from "react-reveal/Bounce";
import Jump from "react-reveal/Jump";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import "./welcomepage.css";

const WelcomePage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const [audio] = useState(new Audio("./sound/s1.wav"));
  const [audioTwo] = useState(new Audio("./sound/s2.wav"));
  const [audioThree] = useState(new Audio("./sound/s3.wav"));
  const [audioFour] = useState(new Audio("./sound/s4.wav"));
  const [audioFive] = useState(new Audio("./sound/s5.wav"));

  useEffect(() => {
    setTimeout(() => {
      audio.play();
    }, 500);
    setTimeout(() => {
      audioTwo.play();
    }, 1500);
    setTimeout(() => {
      audioThree.play();
    }, 2500);
    setTimeout(() => {
      audioFour.play();
    }, 4300);
    setTimeout(() => {
      audioFive.play();
    }, 4500);
  }, []);

  return (
    <div className="welcome_page">
      <div className="welcome_text_wrapper">
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
            <i className="fas fa-camera"></i>
          </Bounce>
        </Jump>
      </div>

      {showAnimation && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
};

export { WelcomePage };
