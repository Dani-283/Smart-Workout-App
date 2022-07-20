import React from "react";
import useTargetsChest from "./useTargetsChest";

const useCountTargetMuscles = () => {
  const { data: chest } = useTargetsChest();
  console.log(chest);

  return data;
};

export default useCountTargetMuscles;
