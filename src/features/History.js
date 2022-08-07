import WorkoutCard from "@components/WorkoutCard.js";
import React, { useMemo } from "react";
import useGetFormattedSetsByWorkoutIds from "@hooks/useGetFormattedSetsByWorkoutIds";
import useGetUserWorkouts from "src/hooks/useGetUserWorkouts";
import useGetExercises from "@hooks/useGetExercises";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Link from "next/link";

const History = () => {
  const user = {
    id: 1,
  };

  const classes = useStyles();
  const { data: workouts } = useGetUserWorkouts(user, 90);
  console.log(workouts);

  const { ids } = useMemo(() => {
    const ids = workouts?.reduce((id, workout) => [...id, workout.id], []);
    return { ids };
  }, [workouts]);

  const { sets } = useGetFormattedSetsByWorkoutIds(ids);

  console.log("ssssss", sets);
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      p={3}
      className={classes.pageContainer}
    >
      <Typography variant="h1">History</Typography>
      <Box display="flex" flexDirection="column" gap={4} p={3}>
        {workouts?.map((wkout) => (
          <Link href={`workout/${wkout.id}`}>
            <a>
              <WorkoutCard key={wkout.id} data={wkout} sets={sets[wkout.id]} />
            </a>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default History;
