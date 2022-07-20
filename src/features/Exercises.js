import useGetExercises from "../hooks/useGetExercises";
import config from "@config";
import useCountTargetMuscles from "hooks/useCountTargetMuscles";
import { useQuery } from "react-query";
import exerciseApi from "../api/exercise";

const Exercises = () => {
  const { data } = useGetExercises();
  // const { data: count } = useCountTargetMuscles(data);
  console.log("dattat", data);

  const { data: bla } = useQuery("bru", async () => {
    exerciseApi.getByIdentifier(2);
  });

  console.log("y0?", bla);

  //iz liste vjezbi skuzit koliko ih koji misic trenira
  // return null;
  return (
    <>
      {data?.map((item) => (
        <p key={item.id}>{item.label}</p>
      ))}
    </>
  );
};

export default Exercises;
