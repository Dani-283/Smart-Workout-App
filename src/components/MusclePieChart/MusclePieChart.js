import { MUSCLE_COLORS } from "@components/MuscleChart/constants";
import { getExerciseNameFromId, removeUnderline } from "@helpers/utils";
import useGetPieChartData from "@hooks/useGetPieChartData";
import {
  Box,
  Card,
  FormControl,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Select from "@mui/material/Select";
import { useState } from "react";
import { VALUES } from "./constants";

const MusclePieChart = ({ userData }) => {
  const [timePeriod, setTimePeriod] = useState(VALUES[0]);
  const matches = useMediaQuery("(min-width:767px)");

  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const { data, isLoading } = useGetPieChartData(
    timePeriod.start,
    timePeriod.end,
    userData
  );

  const renderLegend = (value) => {
    return <span>{removeUnderline(value)}</span>;
  };

  return (
    <Card
      style={{
        maxHeight: matches ? 400 : 590,
        height: data && "100%",
        marginTop: 56,
        padding: matches ? 24 : 16,
        width: matches ? "90%" : "100%",
        margin: "56px auto",
        maxWidth: 960,
      }}
    >
      <Box
        display="flex"
        alignContent="center"
        justifyContent="space-between"
        mb={3}
        flexDirection={!matches && "column"}
      >
        <Typography variant="h3">Sets Per Muscle</Typography>
        <FormControl
          sx={{ m: 1, minWidth: 120, margin: !matches && "24px auto 0" }}
          size="small"
        >
          <Select value={timePeriod} onChange={handleChange}>
            {VALUES.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box height={"100%"} width={matches ? "70%" : "100%"} mx="auto">
        {!data && !isLoading ? (
          <Typography mt={8} mb={6} align="center">
            You don't have workouts during that period
          </Typography>
        ) : (
          <ResponsiveContainer
            width={matches ? "90%" : "100%"}
            height={matches ? "90%" : "70%"}
            styles={{ margin: "auto" }}
          >
            <PieChart width={800} height={200}>
              <Pie
                dataKey="value"
                data={data}
                innerRadius={50}
                outerRadius={90}
                label
              >
                {data?.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={MUSCLE_COLORS[item.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                formatter={renderLegend}
                verticalAlign={matches ? "middle" : "bottom"}
                align={matches ? "right" : "center"}
                layout={matches ? "vertical" : "horizontal"}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Card>
  );
};

export default MusclePieChart;
