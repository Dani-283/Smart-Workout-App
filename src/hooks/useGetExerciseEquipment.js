import { GET_EXERCISE_EQUIPMENT } from "@helpers/queries";
import { removeRdfPrefix } from "@helpers/utils";
import { useQuery } from "react-query";

const useGetExerciseEquipment = (id, enabled) => {
  const QueryEngine = require("@comunica/query-sparql").QueryEngine;
  const myEngine = new QueryEngine();

  const graphEndpoint = `<${id}>`;

  const { data } = useQuery(
    ["equipment", id],
    async () => {
      const bindingsStream = await myEngine.queryBindings(
        GET_EXERCISE_EQUIPMENT(graphEndpoint),
        {
          sources: ["http://localhost:3030/server"],
        }
      );
      const bindings = await bindingsStream.toArray();

      const exercises = bindings.map((ex) => {
        return {
          equipment: ex.get("equipment").value,
        };
      });
      return exercises[0].equipment;
    },
    { enabled: enabled }
  );
  return data && removeRdfPrefix(data);
};

export default useGetExerciseEquipment;
