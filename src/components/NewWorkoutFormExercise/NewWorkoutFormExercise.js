import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import useGetExerciseEquipment from "@hooks/useGetExerciseEquipment";
import FormExerciseSet from "@components/FormExerciseSet";

const NewWorkoutFormExercise = ({
  exercise,
  addSet,
  removeSet,
  editable,
  details,
}) => {
  const classes = useStyles();
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
          <FormExerciseSet
            key={i}
            i={i}
            editable={editable}
            set={set}
            details={details}
            equipment={equipment}
            removeSet={removeSet}
            exercise={exercise}
          />
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

  addSet: {
    marginTop: theme.spacing(3),
  },
  name: {
    color: theme.palette.primary.blue,
    fontSize: 20,
  },
}));

export default NewWorkoutFormExercise;
