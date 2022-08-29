import workoutApi from "@api/workout";
import { useQuery } from "react-query";

const useGetWorkoutsPerWeek = (userId, range) => {
  return useQuery(
    ["workouts-per-week", userId],
    () => workoutApi.getWorkoutsPerWeek(userId, range),
    { enabled: !!userId }
  );
};

export default useGetWorkoutsPerWeek;
