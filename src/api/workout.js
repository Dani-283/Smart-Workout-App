import axios from "./base";

const getWorkoutById = (identifier) =>
  axios.get(`/workouts/workout/${identifier}`);

const getUserWorkouts = (userId, range) =>
  axios.get(`/workouts/${userId}?range=${range || 7}`);

export default {
  getWorkoutById,
  getUserWorkouts,
};
