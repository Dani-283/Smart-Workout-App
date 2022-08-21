import { useQuery } from "react-query";
import setApi from "@api/set";
import { useEffect, useState } from "react";

const useGetFormattedSetsByWorkoutIds = (ids) => {
  const [sets, setSets] = useState({});
  useEffect(() => {
    (async () => {
      const notFetchedIds = ids?.filter((a) => !!a && !sets[a]);
      if (notFetchedIds?.length > 0) {
        const newSets = await setApi.getSetsByWorkoutIds(notFetchedIds);
        const newSetsMap = notFetchedIds?.reduce((res, u) => {
          const fetchedSets = newSets.filter(
            (set) => set.workoutId === Number(u)
          );

          const a = fetchedSets.reduce((r, a) => {
            r[a.exerciseId] = r[a.exerciseId] || [];
            r[a.exerciseId].push(a);
            return r;
          }, Object.create(null));

          res[u] = a || { workoutId: u };
          return res;
        }, {});

        setSets((state) => ({ ...state, ...newSetsMap }));
      }
    })();
  }, [ids]);

  return { sets };
};

export default useGetFormattedSetsByWorkoutIds;
