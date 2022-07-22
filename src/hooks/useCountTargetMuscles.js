import { useMemo } from "react";
import useGetBulkExercises from "./useGetBulkExercises";
import useGetExercises from "./useGetExercises";
import useTargetsChest from "./useTargetsChest";

const useCountTargetMuscles = (sets) => {
  const { data } = useGetExercises();
  const { ids } = useMemo(() => {
    const ids = sets?.reduce((id, set) => [...id, set.exerciseId], []);
    console.log("ids", ids);
    return { ids };
  }, [sets]);

  const { data: chest } = useTargetsChest();
  console.log("chesto", chest);

  // const { data: ex } = useGetBulkExercises(ids);
  // console.log("plzzzzzz", ex);

  // const exercises = [
  //   {
  //     id: 4,
  //     createdAt: "2022-07-18T13:41:02.549Z",
  //     description: null,
  //     exerciseId:
  //       "http://www.semanticweb.org/đani/ontologies/2021/3/workout#Bench_press",
  //     workoutId: 1,
  //     rir: 2,
  //     weight: 40,
  //     reps: 6,
  //   },
  //   {
  //     id: 1,
  //     createdAt: "2022-06-20T23:20:46.678Z",
  //     description: "dururur",
  //     exerciseId:
  //       "http://www.semanticweb.org/đani/ontologies/2021/3/workout#Bench_press",
  //     workoutId: 1,
  //     rir: 2,
  //     weight: 40,
  //     reps: 8,
  //   },
  //   {
  //     id: 2,
  //     createdAt: "2022-06-20T23:20:46.685Z",
  //     description: "lalalal",
  //     exerciseId:
  //       "http://www.semanticweb.org/đani/ontologies/2021/3/workout#Pull_up",
  //     workoutId: 1,
  //     rir: 2,
  //     weight: 40,
  //     reps: 7,
  //   },
  //   {
  //     id: 5,
  //     createdAt: "2022-06-20T23:20:46.685Z",
  //     description: "",
  //     exerciseId:
  //       "http://www.semanticweb.org/đani/ontologies/2021/3/workout#Dumbell_row",
  //     workoutId: 1,
  //     rir: 2,
  //     weight: 20,
  //     reps: 7,
  //   },
  // ];

  console.log("data", data);

  // const a = exercises?.forEach((ex) => {
  //   console.log(data?.find((d) => d.id === ex.exerciseId));
  // });

  const exercises = data
    ? sets?.map((ex) => {
        return data?.find((d) => d.id === ex.exerciseId);
      })
    : null;

  const count = exercises?.reduce((obj, b) => {
    obj[b?.primary] = ++obj[b?.primary] || 1;
    b?.secondary.forEach((e) => {
      console.log("eeeee", e);
      obj[e] = obj[e] + 0.5 || 0.5;
    });
    return obj;
  }, {});

  return count;
};

export default useCountTargetMuscles;
