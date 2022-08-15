import { Skeleton } from "@mui/material";
import React from "react";

const ExerciseListSkeleton = () => {
  return [...Array(12)].map((_, i) => (
    <Skeleton
      key={i}
      variant="rectangular"
      sx={{
        paddingBlock: 1,
        paddingInline: 2.5,
        height: 60,
        marginInline: 2.5,
        marginBottom: 2,
      }}
    ></Skeleton>
  ));
};

export default ExerciseListSkeleton;
