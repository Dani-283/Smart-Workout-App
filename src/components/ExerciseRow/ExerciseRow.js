import useGetExerciseLabel from "@hooks/useGetExerciseLabel";
import { Box, TableRow, TableCell, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import React from "react";

const ExerciseRow = ({ sets, id }) => {
  const { data: label } = useGetExerciseLabel(id);
  const matches = useMediaQuery("(min-width:425px)");
  const classes = useStyles();

  return (
    <TableRow key={id} sx={{ border: 0 }}>
      <TableCell
        className={clsx(classes.tableCell, classes.label)}
        scope="row"
        width={matches ? "40%" : "33%"}
      >
        {label}
      </TableCell>
      <TableCell
        className={classes.tableCell}
        align="left"
        width={matches ? "40%" : "27%"}
      >
        <Box display="flex">
          {sets[id][0].weight !== null ? (
            sets[id].map((item, i) => (
              <Box display="flex" key={i}>
                <p>{`${item.weight}${sets[id].length > i + 1 ? "/" : ""}`}</p>
              </Box>
            ))
          ) : (
            <p>-</p>
          )}
        </Box>
      </TableCell>
      <TableCell
        className={classes.tableCell}
        align="left"
        width={matches ? "40%" : "27%"}
      >
        <Box display="flex">
          {sets[id].map((item, i) => (
            <Box display="flex" key={i}>
              <p>{`${item.reps}${sets[id].length > i + 1 ? "/" : ""}`}</p>
            </Box>
          ))}
        </Box>
      </TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles((theme) => ({
  label: {
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "26vw",
    },
  },

  tableCell: {
    paddingTop: 8,
    paddingBottom: 8,
    border: 0,

    [theme.breakpoints.down(theme.breakpoints.values.s)]: {
      paddingRight: 0,
      paddingLeft: 12,

      "& p": {
        fontSize: 14,
      },
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

export default ExerciseRow;
