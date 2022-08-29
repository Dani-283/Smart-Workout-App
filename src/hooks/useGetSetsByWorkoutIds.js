import setApi from "@api/set";
import { useQuery } from "react-query";

const useGetSetsByWorkoutIds = (ids) => {
  return useQuery(["sets", ids], async () => setApi.getSetsByWorkoutIds(ids), {
    enabled: !!ids?.length,
  });
};

export default useGetSetsByWorkoutIds;
