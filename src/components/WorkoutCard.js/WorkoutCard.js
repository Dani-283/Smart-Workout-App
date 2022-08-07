import ExerciseRow from "@components/ExerciseRow";
import { getExerciseNameFromId } from "@helpers/utils";
import useGetSetsByWorkout from "@hooks/useGetSetsByWorkout";
import { Box, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";

const WorkoutCard = ({ data, sets }) => {
  const classes = useStyles();
  const keys = sets && Object.keys(sets);

  const date = format(new Date(data.createdAt), "MMMM dd");

  return (
    // <Card className={classes.card}>
    //   {<h3>{data.title}</h3>}
    //   <Box>
    //     <Box display="flex" gap={16.5}>
    //       <Typography className={clsx(classes.header, classes.exName)}>
    //         Exercise
    //       </Typography>
    //       <Typography className={clsx(classes.header, classes.weights)}>
    //         Weights
    //       </Typography>
    //       <Typography className={classes.header}>Reps</Typography>
    //     </Box>
    //   </Box>

    //   {sets &&
    //     keys?.map((id, index) => (
    //       <ExerciseRow key={index} sets={sets} id={id} />
    //     ))}
    // </Card>

    <TableContainer component={Paper}>
      <div className={classes.title}>
        <h3>{data.title}</h3>
        <p>{date}</p>
      </div>
      <Table aria-label="simple table">
        {/* <TableHead> */}
        <TableRow>
          <TableCell
            sx={{ border: 0, paddingBottom: 1.5 }}
            className={classes.header}
          >
            Exercise
          </TableCell>
          <TableCell
            sx={{ border: 0, paddingBottom: 1.5 }}
            className={classes.header}
            align="left"
          >
            Weights
          </TableCell>
          <TableCell
            sx={{ border: 0, paddingBottom: 1.5 }}
            className={classes.header}
            align="left"
          >
            Reps
          </TableCell>
        </TableRow>
        {/* </TableHead> */}
        <TableBody>
          {sets &&
            keys?.map((id, index) => (
              <ExerciseRow key={index} sets={sets} id={id} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

WorkoutCard.propTypes = {
  data: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  card: { padding: theme.spacing(2, 3, 3) },
  header: { color: theme.palette.primary.blue, fontWeight: 600 },
  title: {
    padding: theme.spacing(2, 2, 0),

    "& h3": {
      fontSize: 26,
    },

    "& p ": {
      opacity: 0.8,
      fontSize: 16,
    },
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
