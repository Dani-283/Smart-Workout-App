import { Formik, Form } from "formik";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, Card } from "@mui/material";
import TextField from "@components/TextField";
import { useState } from "react";
import ChooseExercise from "@components/ChooseExercise";
import { removeRdfPrefix } from "@helpers/utils";
import clsx from "clsx";
import workoutApi from "@api/workout";
import { useRouter } from "next/router";
import { queryClient } from "@api/base";

const NewWorkoutFormo = ({ data }) => {
  const classes = useStyles();
  const router = useRouter();
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exercises, setExercises] = useState([]);

  const addSet = (exerciseId) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    const setNum = exercise.sets.length;

    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: [
              ...ex.sets,
              {
                id: `${removeRdfPrefix(exercise.id)}-set_${setNum + 1}`,
                weight: "",
                reps: "",
                rir: "",
              },
            ],
          };
        }
        return ex;
      })
    );
  };

  console.log("ex", exercises);

  const body = {
    title: `Today's workout`,
    userId: 1,
    exercises: exercises,
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
    });
    queryClient.invalidateQueries(["workouts", 1]);

    router.push("/?tab=history");
  };

  return (
    <Box p={3}>
      <Formik
        // validationSchema={validationSchema}
        // validateOnBlur
        // validateOnChange={false}
        // enableReinitialize
        initialValues={{ workoutTitle: `Today's workout` }}
        onSubmit={async (values) => create(values)}
      >
        {({ dirty, resetForm, setFieldValue, values }) => (
          <Form className={classes.form}>
            <Card sx={{ padding: 3 }}>
              <Box display="flex" flexDirection="column">
                <TextField
                  className={classes.label}
                  name={"workoutTitle"}
                  containerClassName={classes.labelContainer}
                />

                {exercises.map((ex, i) => (
                  <Box key={i} mt={3} display="flex" flexDirection="column">
                    <Typography className={classes.name}>{ex.label}</Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {ex.sets.map((set, i) => (
                        <Box
                          key={i}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Typography
                              align="center"
                              className={clsx(
                                classes.columnName,
                                i > 0 && "hidden"
                              )}
                            >
                              SET
                            </Typography>
                            <Typography align="center">{i + 1}</Typography>
                          </Box>
                          <Box>
                            <Typography
                              align="center"
                              className={clsx(
                                classes.columnName,
                                i > 0 && "hidden"
                              )}
                            >
                              PREVIOUS
                            </Typography>
                            <Typography align="center">-</Typography>
                          </Box>
                          {ex.equipment !== "Bodyweight" && (
                            <Box>
                              <Typography
                                align="center"
                                className={clsx(
                                  classes.columnName,
                                  i > 0 && "hidden"
                                )}
                              >
                                WEIGHTS
                              </Typography>
                              <TextField
                                type="number"
                                name={`${removeRdfPrefix(ex.id)}-set_${
                                  i + 1
                                }-weight`}
                              />
                            </Box>
                          )}
                          <Box>
                            <Typography
                              align="center"
                              className={clsx(
                                classes.columnName,
                                i > 0 && "hidden"
                              )}
                            >
                              REPS
                            </Typography>
                            <TextField
                              type="number"
                              name={`${removeRdfPrefix(ex.id)}-set_${
                                i + 1
                              }-reps`}
                            />
                          </Box>
                          <Box>
                            <Typography
                              align="center"
                              className={clsx(
                                classes.columnName,
                                i > 0 && "hidden"
                              )}
                            >
                              RIR
                              <div className={classes.info}>?</div>
                            </Typography>
                            <TextField
                              type="number"
                              name={`${removeRdfPrefix(ex.id)}-set_${
                                i + 1
                              }-rir`}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      className={clsx(classes.addButton, classes.addSet)}
                      onClick={() => addSet(ex.id)}
                    >
                      + Add Set
                    </Button>
                  </Box>
                ))}
                <Button
                  disableRipple
                  className={classes.addButton}
                  onClick={() => setShowExerciseModal(true)}
                >
                  + Add Exercise
                </Button>

                {showExerciseModal && (
                  <ChooseExercise
                    setOpen={setShowExerciseModal}
                    setExercises={setExercises}
                  />
                )}
              </Box>
            </Card>
            <Button
              disabled={!dirty}
              type="submit"
              variant="outlined"
              className={classes.finish}
            >
              FINISH
            </Button>
            {/* <Button onClick={() => create(body, values)}>FINISH</Button> */}
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
  },
  labelContainer: {
    maxWidth: "fit-content",
  },
  addSet: {
    marginTop: theme.spacing(2),
  },
  name: {
    color: theme.palette.primary.blue,
    marginBottom: theme.spacing(2),
    fontSize: 20,
  },

  columnNames: {
    display: "flex",
  },
  columnName: {
    fontSize: 12,
    marginBottom: theme.spacing(1.5),
    position: "relative",
  },

  info: {
    top: "-10px",
    position: "absolute",
    right: "45px",
    border: "1px solid black",
    borderRadius: "50%",
    lineHeight: "13px",
    width: "15px",
    fontSize: "10px",
    paddingTop: "1px",

    "&:hover": {
      cursor: "pointer",
    },
  },
  finish: {
    fontWeight: 600,
    color: theme.palette.primary.blue,
    fontSize: 18,
    borderColor: theme.palette.primary.blue,
    marginTop: 20,
  },
}));

export default NewWorkoutFormo;
