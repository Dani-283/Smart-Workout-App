import {
  GET_ALL_EXERCISES,
  GET_COMPOUNDS,
  GET_ISOLATIONS,
} from "@helpers/queries";
import { filterDataObject } from "@helpers/utils";
import { useQuery } from "react-query";

const useGetExercises = () => {
  const QueryEngine = require("@comunica/query-sparql").QueryEngine;
  const myEngine = new QueryEngine();
  return useQuery("all-exercises", async () => {
    const bindingsStream = await myEngine.queryBindings(GET_ALL_EXERCISES, {
      sources: ["http://localhost:3030/server"],
    });
    const bindings = await bindingsStream.toArray();
    const exercises = bindings.map((ex) => {
      const hasSecondary = ex.has("secondary");
      return {
        id: ex.get("individual").value,
        label: ex.get("label").value,
        primary: ex.get("primary").value,
        equipment: ex.get("equipment").value,
        ...(hasSecondary && { secondary: ex.get("secondary").value }),
      };
    });

    const mapped = exercises?.map((item) => ({
      ...item,
      ...(item.secondary && { secondary: [item.secondary] }),
    }));
    const filteredData = mapped && filterDataObject(mapped, "id", "secondary");

    filteredData.forEach((item) => {
      !item.secondary && delete item.secondary;
    });

    return filteredData;
  });
};

export default useGetExercises;
