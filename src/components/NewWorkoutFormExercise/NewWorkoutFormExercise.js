import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import { removeRdfPrefix } from "@helpers/utils";
import TextField from "@components/TextField";

import Remove from "@mui/icons-material/Close";
import { useFormikContext } from "formik";
import { GET_EXERCISE_EQUIPMENT } from "@helpers/queries";
import useGetExerciseEquipment from "@hooks/useGetExerciseEquipment";

const NewWorkoutFormExercise = ({
  exercise,
  addSet,
  removeSet,
  editable,
  details,
}) => {
  const classes = useStyles();
  const { setFieldValue, initialValues } = useFormikContext();
  const equipment =
    useGetExerciseEquipment(exercise.id, !exercise.equipment) ||
    exercise.equipment;

  return (
    <Box
      mb={!editable && 4.5}
      mt={editable && 3}
      display="flex"
      flexDirection="column"
      maxWidth={details && 760}
    >
      <Typography className={classes.name} mb={editable ? 2 : 0}>
        {exercise.label}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={editable && 1}
        mt={!editable && 2}
      >
        {exercise.sets.map((set, i) => (
          <Box key={i} display="flex" justifyContent="space-between" gap={0.75}>
            <Box>
              <Typography
                align="center"
                className={clsx(
                  classes.columnName,
                  !editable && classes.smallMargin,
                  i > 0 && classes.hideTitles
                )}
              >
                SET
              </Typography>
              <Typography
                className={clsx(
                  classes.setNum,
                  !editable && classes.notEditableNum
                )}
                align="center"
              >
                {i + 1}
              </Typography>
            </Box>
            {!details && (
              <Box>
                <Typography
                  align="center"
                  className={clsx(
                    classes.columnName,
                    !editable && classes.smallMargin,
                    i > 0 && classes.hideTitles
                  )}
                >
                  PREV
                </Typography>
                <Typography align="center">-</Typography>
              </Box>
            )}
            {equipment !== "Bodyweight" && (
              <Box>
                <Typography
                  align="center"
                  className={clsx(
                    classes.columnName,
                    !editable && classes.smallMargin,
                    i > 0 && classes.hideTitles
                  )}
                >
                  WEIGHTS
                </Typography>
                <TextField
                  containerClassName={classes.textField}
                  className={clsx(!editable && classes.notEditable)}
                  disabled={!editable}
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
                className={clsx(
                  classes.columnName,
                  !editable && classes.smallMargin,
                  i > 0 && classes.hideTitles
                )}
              >
                REPS
              </Typography>
              <TextField
                containerClassName={classes.textField}
                className={clsx(!editable && classes.notEditable)}
                disabled={!editable}
                type="number"
                name={`${removeRdfPrefix(exercise.id)}-set_${set.order}-reps`}
              />
            </Box>
            <Box>
              <Typography
                align="center"
                className={clsx(
                  classes.columnName,
                  !editable && classes.smallMargin,
                  i > 0 && classes.hideTitles
                )}
              >
                RIR
                <span className={classes.info}>?</span>
              </Typography>
              <TextField
                containerClassName={classes.textField}
                className={clsx(!editable && classes.notEditable)}
                disabled={!editable}
                type="number"
                name={`${removeRdfPrefix(exercise.id)}-set_${set.order}-rir`}
              />
            </Box>
            {editable && (
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
            )}
          </Box>
        ))}
      </Box>
      {editable && (
        <Button
          className={clsx(classes.addButton, classes.addSet)}
          onClick={() => addSet(exercise.id)}
        >
          + Add Set
        </Button>
      )}
    </Box>
  );
};

NewWorkoutFormExercise.propTypes = {
  exercise: PropTypes.object,
  addSet: PropTypes.func,
  removeSet: PropTypes.func,
  editable: PropTypes.bool,
  details: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: "auto",
    color: theme.palette.primary.blue,
    fontWeight: 700,
  },

  textField: {
    [theme.breakpoints.down(theme.breakpoints.values.s)]: {
      margin: "auto",
      maxWidth: "90%",
      minWidth: 50,
    },
  },

  addSet: {
    marginTop: theme.spacing(3),
  },
  name: {
    color: theme.palette.primary.blue,
    fontSize: 20,
  },
  hideTitles: {
    visibility: "hidden",
    height: 8,
  },
  setNum: {
    color: theme.palette.primary.blue,
    marginTop: theme.spacing(2),
  },
  notEditableNum: {
    marginTop: theme.spacing(0.75),
  },

  columnName: {
    fontSize: 12,
    marginBottom: theme.spacing(1.5),
    position: "relative",
  },

  smallMargin: {
    marginBottom: theme.spacing(0.5),
  },

  removeIcon: {
    minWidth: "unset",
    height: "fit-content",
    alignSelf: "flex-end",
    color: theme.palette.text.error,

    [theme.breakpoints.down(theme.breakpoints.values.s)]: {
      paddingInline: 0,
    },
  },

  info: {
    top: "-10px",
    position: "absolute",
    border: "1px solid black",
    borderRadius: "50%",
    lineHeight: "13px",
    width: "15px",
    fontSize: "10px",
    paddingTop: "1px",

    "&:hover": {
      cursor: "pointer",
    },

    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      right: "45px",
    },
  },

  notEditable: {
    border: "none",
    padding: 6,
  },
}));

export default NewWorkoutFormExercise;
