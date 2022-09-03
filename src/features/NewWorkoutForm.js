import { Formik, Form } from "formik";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, Card } from "@mui/material";
import TextField from "@components/TextField";
import { useState } from "react";
import ChooseExercise from "@components/ChooseExercise";
import { removeRdfPrefix } from "@helpers/utils";
import workoutApi from "@api/workout";
import { useRouter } from "next/router";
import { queryClient } from "@api/base";
import NewWorkoutFormExercise from "@components/NewWorkoutFormExercise";

const NewWorkoutForm = ({ userData }) => {
  const classes = useStyles();
  const router = useRouter();
  const [showExerciseModal, setShowExerciseModal] = useState(true);
  const [exercises, setExercises] = useState([]);

  const addSet = (exerciseId) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    const setNum = exercise.sets.length;
    const first = exercise.sets[0].order;
    const dif = setNum + first;

    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: [
              ...ex.sets,
              {
                id: `${removeRdfPrefix(exercise.id)}-set_${dif}`,
                weight: "",
                reps: "",
                rir: "",
                order: dif,
              },
            ],
          };
        }
        return ex;
      })
    );
  };

  const removeSet = (exerciseId, setOrder) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    const setNum = exercise.sets.length;
    const deleteEx = setNum - 1 === 0;
    setExercises((prev) => {
      if (deleteEx) return prev.filter((ex) => ex.id !== exerciseId);
      return prev.map((ex) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.filter((set, i) => i !== setOrder),
          };
        }
        return ex;
      });
    });
  };

  const create = async (values) => {
    const copy = [...exercises];
    copy.map((ex) =>
      ex.sets.map((set) =>
        Object.entries(values).find((e) => {
          const bol = e[0].includes(set.id);
          if (bol) {
            const keyword = e[0].split(`${set.id}-`)[1];
            set[keyword] = e[1];
          }
        })
      )
    );

    setExercises((prev) =>
      prev.map((ex) => {
        const found = copy.find((c) => c.id === ex.id);
        const foundSets = found.sets;
        return { ...ex, sets: foundSets };
      })
    );

    const workout = await workoutApi.createWorkout({
      exercises: [...exercises],
      title: values.workoutTitle,
      userId: userData?.id,
    });
    queryClient.invalidateQueries(["workouts", userData?.id]);
    queryClient.invalidateQueries(["sets", workout.id]);
    queryClient.invalidateQueries(["workouts-per-week", workout.userId]);
    exercises.forEach((ex) =>
      ex.sets.forEach((set) =>
        queryClient.invalidateQueries([
          "prev",
          removeRdfPrefix(ex.id),
          set.order,
        ])
      )
    );

    router.push("/?tab=history");
  };

  return (
    <Box maxWidth={960} margin="auto">
      <Formik
        initialValues={{ workoutTitle: `Today's workout` }}
        onSubmit={async (values) => create(values)}
      >
        {({ dirty }) => (
          <Form className={classes.form}>
            <Card
              className={classes.card}
              sx={{ padding: 3, maxWidth: 960, margin: "auto" }}
            >
              <Box display="flex" flexDirection="column">
                <TextField
                  className={classes.label}
                  name={"workoutTitle"}
                  containerClassName={classes.labelContainer}
                />

                {exercises.map((ex, i) => (
                  <NewWorkoutFormExercise
                    exercise={ex}
                    key={i}
                    addSet={addSet}
                    removeSet={removeSet}
                    editable
                  />
                ))}
                <Box display="flex">
                  <Button
                    disableRipple
                    className={classes.addButton}
                    onClick={() => setShowExerciseModal(true)}
                  >
                    + Add Exercise
                  </Button>
                </Box>

                {showExerciseModal && (
                  <ChooseExercise
                    setOpen={setShowExerciseModal}
                    setExercises={setExercises}
                  />
                )}
              </Box>
            </Card>
            <Box display="flex" gap={3} justifyContent="center">
              <Button
                disabled={!dirty || !exercises.length}
                type="submit"
                variant="outlined"
                className={classes.finish}
              >
                FINISH
              </Button>
              <Button
                variant="outlined"
                className={classes.cancel}
                onClick={() => router.back()}
              >
                CANCEL
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: "auto",
    color: theme.palette.primary.blue,
    fontWeight: 700,
  },

  label: {
    border: "none",
    fontSize: 32,
    lineHeight: "40px",
    fontWeight: 700,
    textAlign: "left",
    paddingLeft: 0,

    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      fontSize: 22,
    },
  },
  labelContainer: {
    maxWidth: "fit-content",
  },

  card: {
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      padding: theme.spacing(1),
    },
  },

  finish: {
    fontWeight: 600,
    color: theme.palette.primary.blue,
    fontSize: 18,
    borderColor: theme.palette.primary.blue,
    marginTop: 20,
    minWidth: 105,
  },

  cancel: {
    fontWeight: 600,
    color: "red",
    fontSize: 18,
    borderColor: "red",
    marginTop: 20,
  },
}));

export default NewWorkoutForm;
