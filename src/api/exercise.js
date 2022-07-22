import axios from "./base";
import queryString from "query-string";

const getExercises = () => axios.get("/exercise");
const getExercisesBySets = (ids) => {
  const string = queryString.stringify({ ids });
  return axios.get(`/exercise/multiple-by-ids?${string}`);
};
const getByIdentifier = (identifier) => axios.get(`/exercise/${identifier}`);

export default {
  getByIdentifier,
  getExercises,
  getExercisesBySets,
};
