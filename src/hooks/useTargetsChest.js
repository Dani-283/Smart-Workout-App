import { useQuery } from "react-query";

const useTargetsChest = () => {
  const QueryEngine = require("@comunica/query-sparql").QueryEngine;
  const myEngine = new QueryEngine();

  return useQuery("target-chest", async () => {
    const bindingsStream = await myEngine.queryBindings(
      `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
      
      SELECT  * WHERE {?exercise ?targetType <http://www.semanticweb.org/đani/ontologies/2021/3/workout#Chest>}
    `,
      {
        sources: ["http://localhost:3030/server"],
      }
    );

    const bindings = await bindingsStream.toArray();

    const data = bindings.map((ex) => ({
      id: ex.get("exercise").value,
      targetType: ex.get("targetType").value,
    }));
    return data;
  });
};

export default useTargetsChest;
