import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import { removeRdfPrefix } from "@helpers/utils";
import TextField from "@components/TextField";

import Remove from "@mui/icons-material/Close";
import { theme } from "@styles/theme";
import { useFormikContext } from "formik";

const NewWorkoutFormExercise = ({ exercise, addSet, removeSet }) => {
  const classes = useStyles();
  const { resetForm, values, setFieldValue } = useFormikContext();
  console.log("vv", values);

  return (
    <Box mt={3} display="flex" flexDirection="column">
      <Typography className={classes.name}>{exercise.label}</Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        {exercise.sets.map((set, i) => (
          <Box key={i} display="flex" justifyContent="space-between">
            <Box>
              <Typography
                align="center"
                className={clsx(classes.columnName, i > 0 && "hidden")}
              >
                SET
              </Typography>
              <Typography className={classes.setNum} align="center">
                {i + 1}
              </Typography>
            </Box>
            <Box>
              <Typography
                align="center"
                className={clsx(classes.columnName, i > 0 && "hidden")}
              >
                PREVIOUS
              </Typography>
              <Typography align="center">-</Typography>
            </Box>
            {exercise.equipment !== "Bodyweight" && (
              <Box>
                <Typography
                  align="center"
                  className={clsx(classes.columnName, i > 0 && "hidden")}
                >
                  WEIGHTS
                </Typography>
                <TextField
                  type="number"
                  name={`${removeRdfPrefix(exercise.id)}-set_${
                    set.order
                  }-weight`}
                />
              </Box>
            )}
            <Box>
              <Typography
                align="center"
                className={clsx(classes.columnName, i > 0 && "hidden")}
              >
                REPS
              </Typography>
              <TextField
                type="number"
                name={`${removeRdfPrefix(exercise.id)}-set_${set.order}-reps`}
              />
            </Box>
            <Box>
              <Typography
                align="center"
                className={clsx(classes.columnName, i > 0 && "hidden")}
              >
                RIR
                <span className={classes.info}>?</span>
              </Typography>
              <TextField
                type="number"
                name={`${removeRdfPrefix(exercise.id)}-set_${set.order}-rir`}
              />
            </Box>
            <Button
              className={classes.removeIcon}
              onClick={() => {
                removeSet(exercise.id, i);
                setFieldValue(
                  `${removeRdfPrefix(exercise.id)}-set_${set.order}-weight`,
                  ""
                );
                setFieldValue(
                  `${removeRdfPrefix(exercise.id)}-set_${set.order}-reps`,
                  ""
                );
                setFieldValue(
                  `${removeRdfPrefix(exercise.id)}-set_${set.order}-rir`,
                  ""
                );
              }}
            >
              <Remove />
            </Button>
          </Box>
        ))}
      </Box>
      <Button
        className={clsx(classes.addButton, classes.addSet)}
        onClick={() => addSet(exercise.id)}
      >
        + Add Set
      </Button>
    </Box>
  );
};

NewWorkoutFormExercise.propTypes = {
  exercise: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: "auto",
    color: theme.palette.primary.blue,
    fontWeight: 700,
  },

  addSet: {
    marginTop: theme.spacing(2),
  },
  name: {
    color: theme.palette.primary.blue,
    marginBottom: theme.spacing(2),
    fontSize: 20,
  },

  setNum: {
    marginTop: theme.spacing(2),
  },

  columnName: {
    fontSize: 12,
    marginBottom: theme.spacing(1.5),
    position: "relative",
  },

  removeIcon: {
    minWidth: "unset",
    height: "fit-content",
    marginTop: theme.spacing(4),
    color: theme.palette.text.error,
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
}));

export default NewWorkoutFormExercise;
