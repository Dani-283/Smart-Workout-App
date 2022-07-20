import axios from "./base";

const getExercises = () => axios.get("/exercise");
const getByIdentifier = (identifier) => axios.get(`/exercise/${identifier}`);

export default {
  getByIdentifier,
  getExercises,
};
