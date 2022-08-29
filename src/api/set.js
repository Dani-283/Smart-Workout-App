import axios from "./base";
import queryString from "query-string";

const getSetsByWorkout = (identifier) =>
  axios.get(`/set?workoutId=${identifier}`);
const getSetsByWorkoutIds = (ids) => {
  const string = queryString.stringify({ ids });
  return axios.get(`/set/multiple-by-workoutIds?${string}`);
};
const getPrevious = (name, order) =>
  axios.get(`/set/prev?name=${name}&order=${order}`);

export default {
  getSetsByWorkout,
  getSetsByWorkoutIds,
  getPrevious,
};
