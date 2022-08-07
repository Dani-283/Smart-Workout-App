import workoutApi from "@api/workout";
import { useQuery } from "react-query";

const useGetWorkoutById = (id) => {
  return useQuery(["workout", id], async () => workoutApi.getWorkoutById(id));
};

export default useGetWorkoutById;
