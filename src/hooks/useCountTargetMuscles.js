import { getExerciseNameFromId, removeRdfPrefix } from "@helpers/utils";
import { FormControlUnstyledContext } from "@mui/base";
import { useMemo } from "react";
import useGetBulkExercises from "./useGetBulkExercises";
import useGetExercises from "./useGetExercises";
import useTargetsChest from "./useTargetsChest";

const useCountTargetMuscles = (sets) => {
  const { data, isLoading } = useGetExercises();

  const exercises = data
    ? sets?.map((ex) => {
        return data?.find((d) => d.id === ex.exerciseId);
      })
    : null;

  const count = exercises?.reduce((obj, b) => {
    obj[removeRdfPrefix(b?.primary)] = ++obj[removeRdfPrefix(b?.primary)] || 1;
    b?.secondary?.forEach((e) => {
      obj[removeRdfPrefix(e)] = obj[removeRdfPrefix(e)] + 0.5 || 0.5;
    });
    return obj;
  }, {});

  let arr = count ? Object.values(count) : [];
  let max = Math.max(...arr);

  return { count, max, isLoading };
};

export default useCountTargetMuscles;
