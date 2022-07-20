import { GET_COMPOUNDS, GET_ISOLATIONS } from "helpers/queries";
import { filterDataObject } from "helpers/utils";
import React from "react";
import { useQuery } from "react-query";

const useGetExercises = () => {
  const QueryEngine = require("@comunica/query-sparql").QueryEngine;
  const myEngine = new QueryEngine();

  return useQuery("bruh", async () => {
    // const compoundsStream = await myEngine.queryBindings(GET_COMPOUNDS, {
    //   sources: ["http://localhost:3030/server"],
    // });

    // const isolationsStream = await myEngine.queryBindings(GET_ISOLATIONS, {
    //   sources: ["http://localhost:3030/server"],
    // });

    //     const isolationsStream = await myEngine.queryBindings(
    //       `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //     PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
    //     SELECT *
    // WHERE { ?individual rdf:type/rdfs:subClassOf* graph:Isolation.
    //         ?individual rdfs:label ?label.
    //         ?individual graph:primaryMuscle ?primary.
    // }
    //     `,
    //       {
    //         sources: ["http://localhost:3030/server"],
    //       }
    //     );

    // const compoundsArray = await compoundsStream.toArray();
    // const isolationsArray = await isolationsStream.toArray();

    // const compounds = compoundsArray.map((ex) => ({
    //   id: ex.get("individual").value,
    //   label: ex.get("label").value,
    //   primary: ex.get("primary").value,
    //   secondary: ex.get("secondary").value,
    // }));

    // const isolations = isolationsArray.map((ex) => ({
    //   id: ex.get("individual").value,
    //   label: ex.get("label").value,
    //   primary: ex.get("primary").value,
    // }));

    // console.log("c", compoundsStream);
    // console.log(compoundsArray);

    // console.log(isolationsStream);
    // console.log("is", isolationsArray);

    const bindingsStream = await myEngine.queryBindings(
      `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
    SELECT DISTINCT * {
        { ?individual rdf:type/rdfs:subClassOf* graph:Exercise.
          ?individual graph:primaryMuscle ?primary.
          ?individual graph:secondaryMuscle ?secondary.
        
         ?individual rdfs:label ?label. }
        UNION
        {  ?individual rdf:type/rdfs:subClassOf* graph:Exercise.
           ?individual graph:primaryMuscle ?primary.
        
        
         ?individual rdfs:label ?label.}
        }
    `,
      {
        sources: ["http://localhost:3030/server"],
      }
    );
    const bindings = await bindingsStream.toArray();

    const exercises = bindings.map((ex) => {
      const hasSecondary = ex.has("secondary");
      return {
        id: ex.get("individual").value,
        label: ex.get("label").value,
        primary: ex.get("primary").value,
        ...(hasSecondary && { secondary: ex.get("secondary").value }),
      };
    });

    const mapped = exercises?.map((item) => ({
      ...item,
      ...(item.secondary && { secondary: [item.secondary] }),
    }));

    mapped && filterDataObject(mapped, "id", "secondary");

    const filteredExercises = mapped.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    return filteredExercises;
  });
};

export default useGetExercises;
