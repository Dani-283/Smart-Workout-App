import useGetExerciseLabel from "@hooks/useGetExerciseLabel";
import { Box, TableRow, TableCell } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";

const ExerciseRow = ({ sets, id }) => {
  const { data: label } = useGetExerciseLabel(id);
  const classes = useStyles();

  return (
    <TableRow key={label} sx={{ border: 0 }}>
      <TableCell
        className={classes.tableCell}
        sx={{ border: 0 }}
        scope="row"
        width="40%"
      >
        {label}
      </TableCell>
      <TableCell
        className={classes.tableCell}
        sx={{ border: 0 }}
        align="left"
        width="40%"
      >
        <Box display="flex">
          {sets[id].map((item, i) => (
            <Box display="flex">
              <p>{`${item.weight}${sets[id].length > i + 1 ? "/" : ""}`}</p>
            </Box>
          ))}
        </Box>
      </TableCell>
      <TableCell
        className={classes.tableCell}
        sx={{ border: 0 }}
        align="left"
        width="40%"
      >
        <Box display="flex">
          {sets[id].map((item, i) => (
            <Box display="flex">
              <p>{`${item.reps}${sets[id].length > i + 1 ? "/" : ""}`}</p>
            </Box>
          ))}
        </Box>
      </TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles((theme) => ({
  tableCell: { paddingTop: 8, paddingBottom: 8 },

  exName: {
    width: "100%",
    maxWidth: 325,
  },

  weights: {
    width: "100%",
    maxWidth: 336,
  },
}));

export default ExerciseRow;
