import useCountTargetMuscles from "@hooks/useCountTargetMuscles";
import useGetSetsByWorkout from "@hooks/useGetSetsByWorkout";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MUSCLE_COLORS } from "./constants";

export default function MuscleChart({ workoutId }) {
  const { data: sets } = useGetSetsByWorkout(workoutId);
  const { count, max } = useCountTargetMuscles(sets);
  const matches = useMediaQuery("(min-width:767px)");

  const data = [count];

  let ticks = [];

  for (let i = 0; i < max; i++) {
    ticks.push(i + 1);
  }

  return (
    <Box
      mt={5}
      height={400}
      maxHeight="30vw"
      width="100%"
      maxWidth={700}
      minHeight={300}
    >
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barGap={20}
          maxBarSize={90}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" />
          <YAxis ticks={ticks} domain={[0, max]} width={!matches ? 20 : 30} />
          <Tooltip />
          <Legend
            align={matches ? "right" : "center"}
            verticalAlign={matches ? "middle" : "bottom"}
            layout={matches ? "vertical" : "horizontal"}
            wrapperStyle={matches && { display: "flex", right: -10, top: 0 }}
          />
          {count &&
            Object.keys(data[0]).map((item, i) => (
              <Bar
                key={i}
                type="monotone"
                dataKey={item}
                fill={MUSCLE_COLORS[item]}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
