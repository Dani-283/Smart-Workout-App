import { Formik, Form } from "formik";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, Card } from "@mui/material";
import TextField from "@components/TextField";
import { useEffect, useMemo, useState } from "react";
import ChooseExercise from "@components/ChooseExercise";
import { removeRdfPrefix } from "@helpers/utils";
import workoutApi from "@api/workout";
import { useRouter } from "next/router";
import { queryClient } from "@api/base";
import NewWorkoutFormExercise from "@components/NewWorkoutFormExercise";
import Edit from "@mui/icons-material/Edit";
import { format } from "date-fns";

const NewWorkoutFormo = ({ data, workout }) => {
  const classes = useStyles();
  const router = useRouter();
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exercises, setExercises] = useState(data);
  const [initial, setInitial] = useState([]);
  const [editable, setEditable] = useState(false);

  console.log("yl", data);
  const { setIds } = useMemo(() => {
    const setIds = data?.reduce((ids, set) => [...ids, set.id], []);

    return { setIds };
  }, [data]);

  useEffect(() => {
    const ex = {
      ...exercises.reduce((res, u) => {
        const sets = u.sets.map((set, i) => ({
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
      userId: 1,
      id: workout.id,
    });
    queryClient.invalidateQueries(["workout", workout.id]);
    queryClient.invalidateQueries(["workouts", 1]);

    router.push("/?tab=history");
  };

  return (
    Object.keys(initial).length && (
      <Box p={3}>
        <Formik
          initialValues={{ ...initial }}
          onSubmit={async (values) => create(values)}
        >
          {({ dirty }) => (
            <Form className={classes.form}>
              <Card sx={{ padding: 3 }}>
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
                        className={classes.edit}
                        onClick={() => setEditable(true)}
                      >
                        <Typography>Edit workout</Typography>
                        <Edit />
                      </Button>
                    )}
                  </Box>
                  <p className={classes.month}>
                    {format(
                      new Date(workout.createdAt),
                      "EEEE, MMMM dd, yyyy, k:mm"
                    )}
                  </p>

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
                    <Button
                      disableRipple
                      className={classes.addButton}
                      onClick={() => setShowExerciseModal(true)}
                    >
                      + Add Exercise
                    </Button>
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
                <Button
                  disabled={!dirty}
                  type="submit"
                  variant="outlined"
                  className={classes.finish}
                >
                  FINISH
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    )
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
  },
  labelContainer: {
    maxWidth: "fit-content",
  },

  finish: {
    fontWeight: 600,
    color: theme.palette.primary.blue,
    fontSize: 18,
    borderColor: theme.palette.primary.blue,
    marginTop: 20,
  },

  edit: {
    display: "flex",
    gap: theme.spacing(1.5),
    color: "#0288d1",
  },
}));

export default NewWorkoutFormo;
