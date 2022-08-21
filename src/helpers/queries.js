export const GET_COMPOUNDS = `   
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
SELECT *
WHERE { ?individual rdf:type/rdfs:subClassOf* graph:Compound.
        ?individual rdfs:label ?label.
        ?individual graph:primaryMuscle ?primary.
        ?individual graph:secondaryMuscle ?secondary
}
`;

export const GET_ISOLATIONS = `   
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
SELECT *
      WHERE { ?individual rdf:type/rdfs:subClassOf* graph:Isolation.
              ?individual rdfs:label ?label.
              ?individual graph:primaryMuscle ?primary
    }
`;

export const GET_ALL_EXERCISES = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
    SELECT DISTINCT * {
        { ?individual rdf:type/rdfs:subClassOf* graph:Exercise.
          ?individual graph:primaryMuscle ?primary.
          ?individual graph:secondaryMuscle ?secondary.
          ?individual graph:usesEquipment ?equipment.	
          ?individual rdfs:label ?label. 	
        }
        UNION
        {  ?individual rdf:type/rdfs:subClassOf* graph:Exercise.
           ?individual graph:primaryMuscle ?primary.
           ?individual graph:usesEquipment ?equipment.	
           ?individual rdfs:label ?label.
        }
        }order by ?primary
`;

export const GET_EXERCISE_LABEL = (id) => `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
SELECT  * WHERE 
	{
                ${id} rdfs:label ?label
	}
`;

export const GET_EXERCISE_EQUIPMENT = (id) => `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX graph: <http://www.semanticweb.org/đani/ontologies/2021/3/workout#>
SELECT  * WHERE 
	{
                ${id} graph:usesEquipment ?equipment.	

	}
`;
