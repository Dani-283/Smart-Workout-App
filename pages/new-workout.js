import AccessDenied from "@components/AccessDenied";
import BackButton from "@components/BackButton";
import Layout from "@components/Layout";
import PageContainer from "@components/PageContainer";
import NewWorkoutForm from "@features/NewWorkoutForm";
import useGetOrCreateUser from "@hooks/useGetOrCreateUser";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const NewWorkout = () => {
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

  return (
    <Layout workout>
      <PageContainer>
        <BackButton />
        <Typography variant="h1" sx={{ marginBottom: 4 }}>
          New Workout
        </Typography>
        <NewWorkoutForm userData={userData} />
      </PageContainer>
    </Layout>
  );
};

export default NewWorkout;
