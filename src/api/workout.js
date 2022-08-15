import axios from "./base";

const getWorkoutById = (identifier) =>
  axios.get(`/workouts/workout/${identifier}`);

const getUserWorkouts = (userId, range) =>
  axios.get(`/workouts/${userId}?range=${range || 7}`);

const createWorkout = (body) => axios.put("/workouts", body);

const deleteWorkout = (id) => axios.delete(`/workouts/delete?workoutId=${id}`);

export default {
  getWorkoutById,
  getUserWorkouts,
  createWorkout,
  deleteWorkout,
};
