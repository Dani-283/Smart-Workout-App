import ExerciseRow from "@components/ExerciseRow";
import { getExerciseNameFromId } from "@helpers/utils";
import useGetSetsByWorkout from "@hooks/useGetSetsByWorkout";
import { Box, Menu, MenuItem, TableHead, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import More from "@mui/icons-material/MoreVert";
import { useState } from "react";
import workoutApi from "@api/workout";
import { queryClient } from "@api/base";

const WorkoutCard = ({ data, sets, groupMonth }) => {
  const classes = useStyles();
  const keys = sets && Object.keys(sets);

  const date = format(new Date(data.createdAt), "MMMM dd");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await workoutApi.deleteWorkout(data.id);
    queryClient.invalidateQueries(["workouts", data.userId]);
    handleClose(e);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null);
  };

  return (
    <Box maxWidth={960} margin="auto">
      {groupMonth && (
        <p className={classes.month}>
          {format(new Date(data.createdAt), "MMMM")}
        </p>
      )}
      <TableContainer component={Paper} sx={{ paddingBottom: 2 }}>
        <div className={classes.title}>
          <div>
            <Typography variant="h3">{data.title}</Typography>
            <p>{date}</p>
          </div>
          <More onClick={(event) => handleClick(event)} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={(event) => handleClose(event)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={(event) => handleDelete(event)}>Delete</MenuItem>
          </Menu>
        </div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ border: 0, paddingBottom: 1.25 }}
                className={classes.header}
              >
                Exercise
              </TableCell>
              <TableCell
                sx={{ border: 0, paddingBottom: 1.25 }}
                className={classes.header}
                align="left"
              >
                Weights
              </TableCell>
              <TableCell
                sx={{ border: 0, paddingBottom: 1.25 }}
                className={classes.header}
                align="left"
              >
                Reps
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sets &&
              keys?.map((id, index) => (
                <ExerciseRow key={index} sets={sets} id={id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

WorkoutCard.propTypes = {
  data: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.primary.blue,
    fontWeight: 600,
    [theme.breakpoints.down(theme.breakpoints.values.s)]: {
      paddingRight: 0,
      paddingLeft: 12,
    },
  },
  title: {
    padding: theme.spacing(2, 2, 0),
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    [theme.breakpoints.down(theme.breakpoints.values.s)]: {
      paddingInline: 12,
    },

    // "& h3": {
    //   [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
    //     fontSize: 26,
    //   },
    // },

    "& p ": {
      opacity: 0.8,
      fontSize: 16,
    },
  },

  month: {
    fontSize: 16,
    opacity: 0.8,
    marginBlock: 8,
  },

  exName: {
    width: "100%",
    maxWidth: 325,
  },

  weights: {
    width: "100%",
    maxWidth: 336,
  },
}));

export default WorkoutCard;
