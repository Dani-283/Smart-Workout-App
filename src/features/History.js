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
import BackButton from "@components/BackButton";
import { useSession } from "next-auth/react";
import useGetOrCreateUser from "@hooks/useGetOrCreateUser";

const History = () => {
  const { data: session, status } = useSession();
  const { data: userData } = useGetOrCreateUser(session?.user.email, session);

  if (typeof window !== "undefined" && status === "loading") return null;

  const classes = useStyles();
  const prevMonth = useRef();

  const { data: workouts, isLoading } = useGetUserWorkouts(userData, 90);

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
      <BackButton />
      <Typography variant="h1" sx={{ marginBottom: 4 }}>
        History
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        className={classes.cards}
      >
        {formattedWorkouts?.length
          ? formattedWorkouts.map((wkout) => (
              <Link href={`workout/${wkout.id}`} key={wkout.id}>
                <a>
                  <WorkoutCard
                    data={wkout}
                    sets={sets[wkout.id]}
                    groupMonth={!!wkout.newMonth}
                  />
                </a>
              </Link>
            ))
          : !isLoading &&
            userData && (
              <Typography textAlign={"center"}>No data to display</Typography>
            )}
      </Box>
    </PageContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  cards: {
    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      padding: theme.spacing(3),
    },
  },
}));

export default History;
