import { getExerciseNameFromId, removeRdfPrefix } from "@helpers/utils";
import {
  ClickAwayListener,
  Dialog,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

import useGetExercises from "@hooks/useGetExercises";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import ExercisesSkeleton from "./ExerciseListSkeleton";
import ExerciseListSkeleton from "./ExerciseListSkeleton";

const ChooseExercise = ({ setOpen, setExercises }) => {
  const classes = useStyles();

  const { setFieldValue, values, initialValues } = useFormikContext();

  const { data, isLoading } = useGetExercises();

  console.log("dddddd", data);

  const handleClick = (exercise) => {
    setExercises((prev) => [
      ...prev,
      {
        ...exercise,
        sets: [
          {
            id: `${removeRdfPrefix(exercise.id)}-set_1`,
            weight: "",
            reps: "",
            order: 1,
          },
        ],
        equipment: `${removeRdfPrefix(exercise.equipment)}`,
      },
    ]);
    setOpen(false);
  };
  console.log("values", values);

  return (
    <Dialog open classes={{ paper: classes.dialog }}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box display="flex" flexDirection="column">
          <Button
            onClick={() => setOpen(false)}
            className={"noHoverButton"}
            sx={{ marginLeft: "auto", padding: "16px 16px 8px 16px" }}
          >
            <CloseIcon />
          </Button>
          <Box px={2.5} pb={2.5} display="flex" alignItems="center" gap={2}>
            <Typography className={classes.title}>Choose exercise</Typography>
            <FilterAltIcon />
          </Box>
          <Box className={classes.list}>
            {isLoading ? (
              <ExerciseListSkeleton />
            ) : (
              data?.map((ex, i) => (
                <Box
                  key={i}
                  className={classes.exercise}
                  py={1}
                  px={2.5}
                  onClick={() => handleClick(ex)}
                >
                  <Typography className={classes.name}>{ex.label}</Typography>
                  <Typography className={classes.muscle}>
                    {getExerciseNameFromId(ex.primary)}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </ClickAwayListener>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxHeight: 500,
    width: "100%",
    maxWidth: 330,

    overflow: "hidden",
  },
  exercise: {
    "&:hover": {
      background: `${theme.palette.primary.blue}0d`,
      cursor: "pointer",
    },
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
  },
  name: {
    fontSize: 18,
  },
  muscle: {
    fontSize: 16,
    opacity: 0.9,
    fontWeight: 500,
  },
  list: {
    overflowY: "auto",
    height: "100%",
    maxHeight: 384,
    paddingBottom: theme.spacing(1.5),

    "&::-webkit-scrollbar": {
      width: "1px",
      position: "relative",
      height: 10,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.background.secondary,
      outline: "1px solid slategrey",
    },
  },
}));

export default ChooseExercise;
