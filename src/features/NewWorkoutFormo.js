import { Formik, Form } from "formik";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, Card } from "@mui/material";
import TextField from "@components/TextField";
import { useEffect, useState } from "react";
import ChooseExercise from "@components/ChooseExercise";
import { removeRdfPrefix } from "@helpers/utils";
import workoutApi from "@api/workout";
import { queryClient } from "@api/base";
import NewWorkoutFormExercise from "@components/NewWorkoutFormExercise";
import Edit from "@mui/icons-material/Edit";
import { format } from "date-fns";
import MuscleChart from "@components/MuscleChart";
import clsx from "clsx";
import BackButton from "@components/BackButton";

const NewWorkoutFormo = ({ data, workout, userData }) => {
  const classes = useStyles();
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exercises, setExercises] = useState(data);
  const [initial, setInitial] = useState([]);
  const [editable, setEditable] = useState(false);

  const setInitialExercises = () => {};

  useEffect(() => {
    setInitialExercises();
    const ex = {
      ...exercises.reduce((res, u) => {
        const sets = u.sets.map((set) => ({
          [`${set.id}-weight`]: set.weight,
          [`${set.id}-reps`]: set.reps,
          [`${set.id}-rir`]: set.rir,
        }));

        const fields = sets.reduce((res, u) => {
          return { ...res, ...u };
        }, {});

        return { ...res, ...fields };
      }, {}),
    };
    setInitial({ ...ex, workoutTitle: workout.title });
  }, []);

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

    await workoutApi.createWorkout({
      exercises: [...exercises],
      title: values.workoutTitle,
      userId: userData?.id,
      id: workout.id,
    });

    queryClient.invalidateQueries(["sets", workout.id]);
    queryClient.invalidateQueries(["sets", [workout.id]]);
    queryClient.invalidateQueries(["workout", workout.id]);
    queryClient.invalidateQueries(["workouts", userData?.id]);
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

    setEditable(false);
  };

  return Object.keys(initial).length ? (
    <Box maxWidth={960} margin="auto">
      <BackButton />
      <Formik
        initialValues={{ ...initial }}
        onSubmit={async (values) => create(values)}
      >
        {({ dirty }) => (
          <Form className={classes.form}>
            <Card
              className={classes.card}
              sx={{
                padding: !editable ? "24px 24px 0" : 3,
              }}
            >
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <TextField
                    className={classes.label}
                    disabled={!editable}
                    name="workoutTitle"
                    containerClassName={classes.labelContainer}
                  />
                  {!editable && (
                    <Button
                      className={clsx(classes.edit, classes.mobileHidden)}
                      onClick={() => setEditable(true)}
                    >
                      <Typography>Edit workout</Typography>
                      <Edit className={classes.editIcon} />
                    </Button>
                  )}
                </Box>
                <p className={classes.month}>
                  {format(
                    new Date(workout.createdAt),
                    "EEEE, MMMM dd, yyyy, k:mm"
                  )}
                </p>

                <MuscleChart workoutId={workout.id} />
                {!editable && (
                  <Button
                    className={clsx(classes.edit, classes.desktopHidden)}
                    onClick={() => setEditable(true)}
                  >
                    <Typography>Edit workout</Typography>
                    <Edit className={classes.editIcon} />
                  </Button>
                )}
                {exercises.map((ex, i) => (
                  <NewWorkoutFormExercise
                    exercise={ex}
                    key={i}
                    addSet={addSet}
                    removeSet={removeSet}
                    editable={editable}
                    details
                  />
                ))}
                {editable && (
                  <Box maxWidth={760} display="flex">
                    <Button
                      disableRipple
                      className={classes.addButton}
                      onClick={() => setShowExerciseModal(true)}
                    >
                      + Add Exercise
                    </Button>
                  </Box>
                )}

                {showExerciseModal && (
                  <ChooseExercise
                    setOpen={setShowExerciseModal}
                    setExercises={setExercises}
                  />
                )}
              </Box>
            </Card>
            {editable && (
              <Box display="flex" gap={3} justifyContent="center">
                <Button
                  disabled={!dirty}
                  type="submit"
                  variant="outlined"
                  className={classes.finish}
                >
                  FINISH
                </Button>
                <Button
                  variant="outlined"
                  className={classes.cancel}
                  onClick={() => setEditable(false)}
                >
                  CANCEL
                </Button>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  ) : (
    ""
  );
};

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: "auto",
    color: theme.palette.primary.blue,
    fontWeight: 700,
  },

  card: {
    marginBottom: 2,
    margin: "auto",
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      boxShadow: "none",
      padding: 0,
    },
  },

  month: {
    opacity: 0.8,
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      fontSize: 14,
    },
  },

  editIcon: {
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      fontSize: 18,
    },
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
      padding: 0,
    },
  },

  labelContainer: {
    maxWidth: "fit-content",
  },

  finish: {
    fontWeight: 600,
    color: theme.palette.primary.blue,
    fontSize: 18,
    borderColor: theme.palette.primary.blue,
    margin: theme.spacing(2.5, 0),
    minWidth: 105,
  },

  cancel: {
    fontWeight: 600,
    color: "red",
    fontSize: 18,
    borderColor: "red",
    margin: theme.spacing(2.5, 0),
  },

  edit: {
    display: "flex",
    gap: theme.spacing(1.5),
    padding: theme.spacing(1, 2),
    color: "#0288d1",
    whiteSpace: "nowrap",
    border: "1px solid",

    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      fontSize: 16,
      gap: theme.spacing(0.75),
    },
  },

  mobileHidden: {
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      display: "none",
    },
  },

  desktopHidden: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      display: "none",
    },
  },
}));

export default NewWorkoutFormo;
