import axios from "./base";

const getWorkoutById = (identifier) =>
  axios.get(`/workouts/workout/${identifier}`);

const getUserWorkouts = (userId, range, end) =>
  axios.get(`/workouts/${userId}?range=${range || 7}&rangeEnd=${end || 0}`);

const createWorkout = (body) => axios.put("/workouts", body);

const deleteWorkout = (id) => axios.delete(`/workouts/delete?workoutId=${id}`);

const getWorkoutsPerWeek = (userId, range) =>
  axios.get(`/workouts/count/${userId}?range=${range}`);

export default {
  getWorkoutById,
  getUserWorkouts,
  createWorkout,
  deleteWorkout,
  getWorkoutsPerWeek,
};
