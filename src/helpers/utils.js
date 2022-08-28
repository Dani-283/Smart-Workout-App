import config from "src/config";

export const filterDataObject = (arr, key, val) => [
  ...arr
    ?.reduce(
      (acc, { [key]: keyProp, [val]: valProp, label, equipment, primary }) => {
        const group = acc.get(keyProp);
        const hasSecondary = !!group?.secondary;
        const shouldPush = !!group && !!valProp && hasSecondary;

        shouldPush
          ? group[val].push(valProp[0])
          : hasSecondary
          ? null
          : acc.set(keyProp, {
              [key]: keyProp,
              [val]: valProp,
              label,
              equipment,
              primary,
            });

        return acc;
      },
      new Map()
    )
    .values(),
];

export const getExerciseNameFromId = (id) => {
  const filteredName = id.split(config.rdf);
  const re = new RegExp("_", "g");

  return filteredName[1].replace(re, " ");
};

export const removeUnderline = (text) => {
  const re = new RegExp("_", "g");
  return text.replace(re, " ");
};

export const removeRdfPrefix = (id) => {
  const filteredName = id.split(config.rdf);

  return filteredName[1];
};
