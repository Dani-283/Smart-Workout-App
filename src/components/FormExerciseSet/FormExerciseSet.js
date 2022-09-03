import { Box, Button, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { removeRdfPrefix } from "@helpers/utils";
import TextField from "@components/TextField";

import Remove from "@mui/icons-material/Close";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import useGetPrevWeight from "@hooks/useGetPrevWeight";

const FormExerciseSet = ({
  editable,
  set,
  removeSet,
  details,
  equipment,
  exercise,
  i,
}) => {
  const { setFieldValue, initialValues } = useFormikContext();
  const classes = useStyles();
  const { data } = useGetPrevWeight(removeRdfPrefix(exercise.id), i + 1);

  return (
    <Box display="flex" justifyContent="space-between" gap={0.75}>
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
          className={clsx(classes.setNum, !editable && classes.notEditableNum)}
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
              i > 0 && classes.hideTitles,
              classes.minWidth
            )}
          >
            PREV
          </Typography>
          {data ? (
            <Typography className={classes.prev} align="center">
              {data.weight} x {data.reps}
            </Typography>
          ) : (
            <Typography align="center">-</Typography>
          )}
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
            name={`${removeRdfPrefix(exercise.id)}-set_${set.order}-weight`}
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
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    [theme.breakpoints.down(theme.breakpoints.values.s)]: {
      margin: "auto",
      maxWidth: "90%",
      minWidth: 50,
    },
  },

  prev: {
    fontSize: 14,
    marginTop: 20,

    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      fontSize: 16,
      marginTop: 18,
    },
  },

  minWidth: { minWidth: 62.3 },

  addSet: {
    marginTop: theme.spacing(3),
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

export default FormExerciseSet;
