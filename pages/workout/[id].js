import AccessDenied from "@components/AccessDenied";
import Layout from "@components/Layout";
import PageContainer from "@components/PageContainer";
import NewWorkoutFormo from "@features/NewWorkoutFormo";
import { getExerciseNameFromId, removeRdfPrefix } from "@helpers/utils";
import useGetFormattedSetsByWorkoutIds from "@hooks/useGetFormattedSetsByWorkoutIds";
import useGetOrCreateUser from "@hooks/useGetOrCreateUser";
import useGetWorkoutById from "@hooks/useGetWorkoutById";
import { useSession } from "next-auth/react";

const WorkoutDetails = ({ id }) => {
  const { sets } = useGetFormattedSetsByWorkoutIds([id]);
  const { data: workout } = useGetWorkoutById(Number(id));
  const { data: session, status } = useSession();
  const { data: userData } = useGetOrCreateUser(session?.user.email, session);
  if (typeof window !== "undefined" && status === "loading") return null;

  if (!session) {
    return (
      <Layout workout>
        <AccessDenied />
      </Layout>
    );
  }

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
          <NewWorkoutFormo
            data={exercises}
            workout={workout}
            userData={userData}
          />
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
