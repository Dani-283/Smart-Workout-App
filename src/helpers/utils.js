import config from "src/config";

export const filterDataObject = (arr, key, val) => [
  ...arr
    ?.reduce((acc, { [key]: keyProp, [val]: valProp }) => {
      const group = acc.get(keyProp);

      const hasSecondary = group && !!group?.secondary && !!valProp;

      hasSecondary
        ? group[val].push(valProp[0])
        : acc.set(keyProp, { [key]: keyProp, [val]: valProp });
      return acc;
    }, new Map())
    .values(),
];

export const getExerciseNameFromId = (id) => {
  const filteredName = id.split(config.rdf);
  const re = new RegExp("_", "g");

  return filteredName[1].replace(re, " ");
};

export const removeRdfPrefix = (id) => {
  const filteredName = id.split(config.rdf);

  return filteredName[1];
};
