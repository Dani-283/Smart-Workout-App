import React from "react";

const useFormatForPieChart = (count) => {
  const arr = count && Object.keys(count);
  const desc = arr?.sort((a, b) => a.length - b.length);

  return desc?.map((item) => ({ name: item, value: count[item] }));
};

export default useFormatForPieChart;
