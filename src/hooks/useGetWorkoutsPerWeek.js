import workoutApi from "@api/workout";
import { useQuery } from "react-query";

const useGetWorkoutsPerWeek = (userId, range) => {
  return useQuery([userId, "workouts-per-week"], () =>
    workoutApi.getWorkoutsPerWeek(userId, range)
  );
};

export default useGetWorkoutsPerWeek;
