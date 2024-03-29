import workoutApi from "@api/workout";
import { useQuery } from "react-query";

const useGetUserWorkouts = (user, start, end) => {
  return useQuery(
    ["workouts", user?.id, start, end],
    async () => workoutApi.getUserWorkouts(user.id, start, end),
    { enabled: !!user }
  );
};

export default useGetUserWorkouts;
