import setApi from "api/set";
import { useQuery } from "react-query";

const useGetSetsByWorkout = (workoutId) => {
  return useQuery(
    ["sets", workoutId],
    async () => setApi.getSetsByWorkout(workoutId),
    { enabled: !!workoutId }
  );
};

export default useGetSetsByWorkout;
