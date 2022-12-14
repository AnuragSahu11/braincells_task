import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import { useSpeechSynthesis } from "react-speech-kit";

const PuzzleDraggable = ({
  data: { img, x, y, name },
  setScore,
  setLoadCount,
  loadCount,
}) => {
  const imgRef = useRef();
  const [netSize, setNetSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imgCoordinate, setImgCoordinate] = useState(false);
  const [inPlace, setInPlace] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isControlled, setIsControlled] = useState(false);
  const { speak } = useSpeechSynthesis();

  let placedCorrectly = false;

  const words = ["Good work", "Bravo", "Well Done", "Kudos"];

  const handleDrag = (e, d) => {
    setIsControlled(true);
    if (!inPlace) {
      if (
        position.x + imgCoordinate.x - x > 0 &&
        position.x + imgCoordinate.x - x < 100 &&
        position.y + imgCoordinate.y - y > 0 &&
        position.y + imgCoordinate.y - y < 100
      ) {
        setPosition({ x: x - imgCoordinate.x, y: y - imgCoordinate.y });
        setInPlace(true);
        placedCorrectly = true;
        imgRef.current.dispatchEvent(new Event("mouseup"));
        setScore((prevState) => prevState + 1);
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 1000);
        speak({
          text: `${name} placed correctly,${
            words[Math.floor(Math.random() * words.length)]
          }`,
        });
      } else {
        setPosition({ x: d.x, y: d.y });
      }
    }
  };

  const dragStop = () => {
    setIsControlled(false);
    if (!placedCorrectly) {
      setPosition({ x: 0, y: 0 });
      speak({ text: "Place animal correctly" });
    }
  };

  useEffect(() => {
    if (loadCount === 0) {
      setNetSize({
        width: imgRef.current.width,
        height: imgRef.current.height,
      });
      setImgCoordinate({
        x: imgRef.current.getBoundingClientRect().x,
        y: imgRef.current.getBoundingClientRect().y,
        height: imgRef.current.getBoundingClientRect().height,
        width: imgRef.current.getBoundingClientRect().width,
      });
      console.log(name, imgRef.current.getBoundingClientRect());
    }
  }, [loadCount]);

  const onImageLoad = () => {
    setLoadCount((prevState) => prevState - 1);
  };

  useEffect(() => {
    if (imgCoordinate) {
      setPosition({ x: x - imgCoordinate.x, y: y - imgCoordinate.y });
    }
    setTimeout(() => {
      setPosition({ x: 0, y: 0 });
    }, 4000);
  }, [imgCoordinate]);

  return (
    <div className="puzzle_draggable">
      <Draggable onDrag={handleDrag} onStop={dragStop} position={position}>
        <div
          className={`puzzle_draggable_content ${
            !isControlled && "transition"
          }`}
        >
          <img
            className={animate && "scale"}
            draggable="false"
            ref={imgRef}
            src={img}
            alt=""
            onLoad={onImageLoad}
          />
        </div>
      </Draggable>
      <div
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${netSize.width}px`,
          height: `${netSize.height}px`,
        }}
        className={`puzzle_net ${animate && "puzzle_net_green"} ${
          !inPlace && "puzzle_net_show"
        }`}
      ></div>
    </div>
  );
};

export { PuzzleDraggable };
