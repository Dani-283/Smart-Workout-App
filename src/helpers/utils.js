export const filterDataObject = (arr, key, val) => [
  ...arr
    ?.reduce((acc, { [key]: keyProp, [val]: valProp }) => {
      const group = acc.get(keyProp);
      const hasSecondary = group && !!valProp;
      hasSecondary
        ? group[val].push(valProp[0])
        : acc.set(keyProp, { [key]: keyProp, [val]: valProp });
      return acc;
    }, new Map())
    .values(),
];
