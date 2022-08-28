import Layout from "@components/Layout";
import PageContainer from "@components/PageContainer";
import NewWorkoutFormo from "@features/NewWorkoutFormo";
import { getExerciseNameFromId, removeRdfPrefix } from "@helpers/utils";
import useGetFormattedSetsByWorkoutIds from "@hooks/useGetFormattedSetsByWorkoutIds";
import useGetSetsByWorkout from "@hooks/useGetSetsByWorkout";
import useGetWorkoutById from "@hooks/useGetWorkoutById";

const WorkoutDetails = ({ id }) => {
  const { sets } = useGetFormattedSetsByWorkoutIds([id]);
  const { data: workout } = useGetWorkoutById(Number(id));

  const exercises =
    Object.keys(sets).length &&
    Object.entries(sets[id]).map((item) => ({
      id: item[0],
      label: getExerciseNameFromId(item[0]),
      sets: item[1].map((set, i) => ({
        ...set,
        id: `${removeRdfPrefix(item[0])}-set_${i + 1}`,
        dbId: set.id,
      })),
    }));

  return (
    <Layout workout>
      <PageContainer>
        {exercises && workout ? (
          <NewWorkoutFormo data={exercises} workout={workout} />
        ) : (
          ""
        )}
      </PageContainer>
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
