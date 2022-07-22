import exercise from "api/exercise";
import { useQuery } from "react-query";

const useGetBulkExercises = (ids) => {
  return useQuery(
    ["bulk-exercises", ids],
    async () => exercise.getExercisesBySets(ids),
    { enabled: !!ids }
  );
};

export default useGetBulkExercises;
