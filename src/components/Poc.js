import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import './Poc.css';

const albums = [...Array(7).keys()];
const physics = { damping: 15, mass: 0.27, stiffness: 55 };
const { round } = Math;

const DRAG_ELASTIC = 2;
const ALBUM_SIZE = 500;

const Album = ({ id }) => {
  return (
    <motion.li
      whileTap={{ scale: .9 }}
      className="Album">

      <div className="Album__cover">
        <span>{id}</span>
      </div>
    </motion.li>
  );
}

export default function Poc () {
  const ref = useRef();

  const centerPoint = round(window.innerWidth / 2);
  const startPoint = round(centerPoint - (ALBUM_SIZE / 2));
  const endPoint = round(centerPoint - (ALBUM_SIZE * albums.length))

  const left = useSpring(startPoint, physics);
  const [target, setTarget] = useState(startPoint);

  // const handleDragEnd = (e, info) => {
  //   const { x: dragOffset} = info.offset;
  //   const coverflowOffset = round(dragOffset * DRAG_ELASTIC);
  //   console.log(coverflowOffset);
  // }

  const handlePrev = () => {
    const prevTarget = target + ALBUM_SIZE;

    if(prevTarget <= startPoint) {
      setTarget(prevTarget);
      left.set(prevTarget);
    }
  }

  const handleNext = () => {
    const nextTarget = target - ALBUM_SIZE;

    if(nextTarget > endPoint) {
      setTarget(nextTarget);
      left.set(nextTarget);
    }
  }

  return (
    <div className="Coverflow">
      <motion.ul
        drag="x"
        ref={ref}
        style={{ left }}
        dragElastic={DRAG_ELASTIC}
        // onDragEnd={handleDragEnd}
        dragConstraints={{ left: 0, right: 0 }}
        className="Coverflow__wrapper">

        {albums.map(id => <Album id={id} key={id} />)}
      </motion.ul>

      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
      <p>Current target: {target}</p>
      <p>Start point: {startPoint}</p>
      <p>End point: {endPoint}</p>
      <p>Center point: {centerPoint}</p>
    </div>
  );
}