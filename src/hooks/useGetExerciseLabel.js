import { GET_EXERCISE_LABEL } from "@helpers/queries";
import { useQuery } from "react-query";

const useGetExerciseLabel = (id) => {
  const QueryEngine = require("@comunica/query-sparql").QueryEngine;
  const myEngine = new QueryEngine();

  const graphEndpoint = `<${id}>`;

  return useQuery(["label", id], async () => {
    const bindingsStream = await myEngine.queryBindings(
      GET_EXERCISE_LABEL(graphEndpoint),
      {
        sources: ["http://localhost:3030/server"],
      }
    );
    const bindings = await bindingsStream.toArray();

    const exercises = bindings.map((ex) => {
      return {
        label: ex.get("label").value,
      };
    });
    return exercises[0].label;
  });
};

export default useGetExerciseLabel;
