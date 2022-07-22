import axios from "./base";
import queryString from "query-string";

const getSetsByWorkout = (identifier) => axios.get(`/set?${identifier}`);
const getSetsByWorkoutIds = (ids) => {
  const string = queryString.stringify({ ids });
  return axios.get(`/set/multiple-by-workoutIds?${string}`);
};

export default {
  getSetsByWorkout,
  getSetsByWorkoutIds,
};
