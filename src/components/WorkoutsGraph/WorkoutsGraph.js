import useFormatRange from "@hooks/useFormatRange";
import useGetWorkoutsPerWeek from "@hooks/useGetWorkoutsPerWeek";
import { endOfWeek } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { makeStyles } from "@mui/styles";
import { Card, Typography, useMediaQuery } from "@mui/material";

const WorkoutsGraph = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:767px)");

  const date = new Date();
  const endWeek = endOfWeek(date, { weekStartsOn: 1 });
  const dif = endWeek.getDate() - date.getDate();
  const range = 55 - dif;
  const { data: graphData } = useGetWorkoutsPerWeek(1, range);
  const yo = useFormatRange(graphData?.data);
  let ticks = [];

  for (let i = 0; i < graphData?.max + 1; i++) {
    ticks.push(i + 1);
  }

  return (
    <Card className={classes.graphContainer}>
      <Typography variant="h3" sx={{ marginBottom: 3 }}>
        Workouts Per Week
      </Typography>
      <ResponsiveContainer width="100%" height={matches ? "90%" : "80%"}>
        <BarChart width={800} height={300} data={yo}>
          <XAxis
            dataKey="range"
            fontSize={matches ? 14 : 8}
            fontWeight={500}
            interval={0}
            tickMargin={10}
          />
          <YAxis
            domain={[0, graphData?.max + 1]}
            ticks={ticks}
            width={matches ? 10 : 8}
            fontWeight={500}
            fontSize={matches ? 14 : 10}
          />
          <ReferenceLine
            y={graphData?.max}
            stroke="#0288d1"
            strokeDasharray="3 3"
          />
          <Bar dataKey="w1" stackId="a" fill="#0288d1" />
          <Bar
            dataKey="w2"
            stackId="a"
            fill="#0288d1"
            stroke={"white"}
            strokeWidth={1}
          />
          <Bar
            dataKey="w3"
            stackId="a"
            fill="#0288d1"
            stroke={"white"}
            strokeWidth={1}
          />
          <Bar
            dataKey="w4"
            stackId="a"
            fill="#0288d1"
            stroke={"white"}
            strokeWidth={1}
          />

          <Bar
            dataKey="w5"
            stackId="a"
            fill="#0288d1"
            stroke={"white"}
            strokeWidth={1}
          />
          <Bar
            dataKey="w6"
            stackId="a"
            fill="#0288d1"
            stroke={"white"}
            strokeWidth={1}
          />
          <Bar
            dataKey="w7"
            stackId="a"
            fill="#0288d1"
            stroke={"white"}
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    maxHeight: "70vw",
    height: "100%",
    width: "100%",
    margin: "auto",
    padding: theme.spacing(3, 2),

    "& h3": {
      [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
        fontSize: 18,
      },
    },

    [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
      width: "90%",
      maxWidth: 960,
      maxHeight: 450,
      padding: theme.spacing(3),
    },
  },
}));

export default WorkoutsGraph;
