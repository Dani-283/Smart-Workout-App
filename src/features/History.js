import WorkoutCard from "@components/WorkoutCard.js";
import React, { useMemo, useRef } from "react";
import useGetFormattedSetsByWorkoutIds from "@hooks/useGetFormattedSetsByWorkoutIds";
import useGetUserWorkouts from "src/hooks/useGetUserWorkouts";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Link from "next/link";
import PageContainer from "@components/PageContainer";
import { getMonth } from "date-fns";

const History = () => {
  const user = {
    id: 1,
  };

  const classes = useStyles();
  const prevMonth = useRef();
  const { data: workouts } = useGetUserWorkouts(user, 90);
  const { ids } = useMemo(() => {
    const ids = workouts?.reduce((id, workout) => [...id, workout.id], []);
    return { ids };
  }, [workouts]);
  const { sets } = useGetFormattedSetsByWorkoutIds(ids);

  const formattedWorkouts = workouts?.map((w, i) => {
    if (prevMonth.current === undefined)
      prevMonth.current = getMonth(new Date(w.createdAt));

    if (
      prevMonth.current !== undefined &&
      prevMonth.current !== getMonth(new Date(w.createdAt))
    ) {
      prevMonth.current = getMonth(new Date(w.createdAt));
      return { ...w, newMonth: true, number: i };
    } else return { ...w };
  });

  return (
    <PageContainer>
      <Typography variant="h1" sx={{ marginBottom: 4 }}>
        History
      </Typography>
      <Box display="flex" flexDirection="column" gap={4} p={3}>
        {formattedWorkouts?.map((wkout) => (
          <Link href={`workout/${wkout.id}`} key={wkout.id}>
            <a>
              <WorkoutCard
                data={wkout}
                sets={sets[wkout.id]}
                groupMonth={!!wkout.newMonth}
              />
            </a>
          </Link>
        ))}
      </Box>
    </PageContainer>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default History;
