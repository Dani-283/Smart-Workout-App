import BackButton from "@components/BackButton";
import Layout from "@components/Layout";
import PageContainer from "@components/PageContainer";
import NewWorkoutForm from "@features/NewWorkoutForm";
import { Typography } from "@mui/material";
import React from "react";

const NewWorkout = () => {
  return (
    <Layout workout>
      <PageContainer>
        <BackButton />
        <Typography variant="h1" sx={{ marginBottom: 4 }}>
          New Workout
        </Typography>
        <NewWorkoutForm />
      </PageContainer>
    </Layout>
  );
};

export default NewWorkout;
