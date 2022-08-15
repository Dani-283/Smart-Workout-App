import Layout from "@components/Layout";
import NewWorkoutFormo from "@features/NewWorkoutFormo";
import useGetFormattedSetsByWorkoutIds from "@hooks/useGetFormattedSetsByWorkoutIds";
import useGetSetsByWorkout from "@hooks/useGetSetsByWorkout";
import React from "react";

const WorkoutDetails = ({ id }) => {
  const { data } = useGetFormattedSetsByWorkoutIds([id]);
  const { data: one } = useGetSetsByWorkout(id);
  console.log(data);
  console.log("one", one);
  return (
    <Layout workout>
      <div>deets{id}</div>
      <NewWorkoutFormo data={data} />
    </Layout>
  );
};

export default WorkoutDetails;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
