import { endOfWeek, startOfWeek } from "date-fns";
import { useMemo } from "react";
import useCountTargetMuscles from "@hooks/useCountTargetMuscles";
import useFormatForPieChart from "@hooks/useFormatForPieChart";
import useGetSetsByWorkoutIds from "@hooks/useGetSetsByWorkoutIds";
import useGetUserWorkouts from "@hooks/useGetUserWorkouts";
const useGetPieChartData = (start, end) => {
  const { data: workouts, isLoading: isLoadingWrkts } = useGetUserWorkouts(
    { id: 1 },
    start,
    end
  );
  console.log(workouts);
  const { ids } = useMemo(() => {
    const ids = workouts?.reduce((id, workout) => [...id, workout.id], []);
    return { ids };
  }, [workouts]);

  const { data: sets, isLoading: isLoadingSets } = useGetSetsByWorkoutIds(ids);
  const { count, max, isLoading: isLoadingCount } = useCountTargetMuscles(sets);

  const isLoading = isLoadingCount || isLoadingSets || isLoadingWrkts;

  const data = useFormatForPieChart(count);
  return { data, isLoading };
};

export default useGetPieChartData;
