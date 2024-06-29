import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

import { useSnapshot } from "valtio";
import state from "../store";

const Backdrop = () => {
  const shadows = useRef();
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.65}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={1.55}
        ambient={0.25}
        position={[7, 7, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.25}
        ambient={0.55}
        position={[-7, 7, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
