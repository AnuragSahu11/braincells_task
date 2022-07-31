import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";

const PuzzleDraggable = ({ data: { img, x, y }, setScore }) => {
  const imgRef = useRef();
  const [netSize, setNetSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imgCoordinate, setImgCoordinate] = useState(null);
  const [inPlace, setInPlace] = useState(false);

  let placedCorrectly = false;

  const handleDrag = (e, d) => {
    if (!inPlace) {
      if (
        position.x + imgCoordinate.x > 0 &&
        position.x + imgCoordinate.x - x < 100 &&
        position.y + imgCoordinate.y > 0 &&
        position.y + imgCoordinate.y - y < 100
      ) {
        setPosition({ x: x - imgCoordinate.x, y: y - imgCoordinate.y });
        setInPlace(true);
        placedCorrectly = true;
        imgRef.current.dispatchEvent(new Event("mouseup"));
        setScore((prevState) => prevState + 1);
      } else {
        setPosition({ x: d.x, y: d.y });
      }
    }
  };

  const dragStop = () => {
    if (!placedCorrectly) {
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setNetSize({
        width: imgRef.current.width,
        height: imgRef.current.height,
      });
      setImgCoordinate({
        x: imgRef.current.getBoundingClientRect().x,
        y: imgRef.current.getBoundingClientRect().y,
      });
    }, 50);
  }, []);

  return (
    <div className="puzzle_draggable">
      <Draggable onDrag={handleDrag} onStop={dragStop} position={position}>
        <div className="puzzle_draggable_content">
          <img draggable="false" ref={imgRef} src={img} alt="" />
        </div>
      </Draggable>
      <div
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${netSize.width}px`,
          height: `${netSize.height}px`,
        }}
        className="puzzle_draggable_net"
      ></div>
    </div>
  );
};

export { PuzzleDraggable };
