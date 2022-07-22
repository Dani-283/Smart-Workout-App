import workoutApi from "api/workout";
import { useQuery } from "react-query";

const useGetUserWorkouts = (user, range) => {
  return useQuery(["workouts", user.id], async () =>
    workoutApi.getUserWorkouts(user.id, range)
  );
};

export default useGetUserWorkouts;
