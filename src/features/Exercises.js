import { useQuery } from "react-query";
import exerciseApi from "../api/exercise";
import useGetSetsByWorkout from "@hooks/useGetSetsByWorkout";
import useGetUserWorkouts from "@hooks/useGetUserWorkouts";
import useGetWorkoutById from "@hooks/useGetWorkoutById";
import useGetSetsByWorkoutIds from "@hooks/useGetFormattedSetsByWorkoutIds";
import { useMemo } from "react";
import useTargetsChest from "@hooks/useTargetsChest";
import useCountTargetMuscles from "@hooks/useCountTargetMuscles";

const Exercises = () => {
  const user = {
    id: 1,
  };
  const { data: workouts } = useGetUserWorkouts(user, 60);
  const first = workouts && workouts[0];

  console.log("workouts", workouts);

  const { ids } = useMemo(() => {
    const ids = workouts?.reduce((id, workout) => [...id, workout.id], []);
    console.log("ids", ids);
    return { ids };
  }, [workouts]);

  const { data: sets } = useGetSetsByWorkoutIds(ids);

  // const { data: sets } = useGetSetsByWorkout(first?.id);
  const count = useCountTargetMuscles(sets);
  console.log("all workouts", workouts);
  console.log("sets", sets);
  console.log("cc", count);

  let date = new Date();
  date.setDate(new Date().getDate() + 7);
  console.log(date);

  //iz liste vjezbi skuzit koliko ih koji misic trenira
  // return null;
  return (
    <>
      {/* {data?.map((item) => (
        <p key={item.id}>{item.label}</p>
      ))} */}
    </>
  );
};

export default Exercises;
