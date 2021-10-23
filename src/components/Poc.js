import { motion } from "framer-motion";
import './Poc.css';

const Album = ({ id }) => {
  return (
    <motion.li
      whileTap={{ scale: .9 }}
      className="Album">

      <div className="Album__cover">
        {id}
      </div>
    </motion.li>
  );
}

export default function Poc () {
  const albums = [...Array(10).keys()];

  return (
    <div className="Coverflow">
      <motion.ul
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1.5}
        onDragEnd={
          (event, info) => console.log(info)
        }
        className="Coverflow__wrapper">

        {albums.map(id => <Album id={id} key={id} />)}
      </motion.ul>
    </div>
  );
}