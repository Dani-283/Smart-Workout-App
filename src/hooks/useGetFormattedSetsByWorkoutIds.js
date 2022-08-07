import { useQuery } from "react-query";
import setApi from "@api/set";
import { useEffect, useState } from "react";

const useGetFormattedSetsByWorkoutIds = (ids) => {
  const [sets, setSets] = useState({});
  console.log(
    "ids",
    ids?.filter((id) => id === 1)
  );
  console.log(sets);
  useEffect(() => {
    (async () => {
      const notFetchedIds = ids?.filter((a) => !!a && !sets[a]);
      if (notFetchedIds?.length > 0) {
        const newSets = await setApi.getSetsByWorkoutIds(notFetchedIds);
        console.log(newSets);
        const newSetsMap = notFetchedIds?.reduce((res, u) => {
          console.log("res", res);
          const fetchedSets = newSets.filter((set) => set.workoutId === u);
          console.log("fetch", fetchedSets);

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
  }, [ids, sets]);

  console.log(sets);
  return { sets };
};

export default useGetFormattedSetsByWorkoutIds;
