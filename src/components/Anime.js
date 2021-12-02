import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import img from "../images/friend.png";
function Anime(props) {
  const { image } = props;
  console.log(image);
  const styles = useSpring({
    loop: { reverse: true },
    from: { x: 0 },
    to: { x: 40 },
    config: { duration: 1000 },
    reset: true,
  });

  return (
    <>
      <animated.div
        style={{
          ...styles,
        }}
      >
        <img src={image} alt="img" width="100%" />
      </animated.div>
    </>
  );
}

export default Anime;
