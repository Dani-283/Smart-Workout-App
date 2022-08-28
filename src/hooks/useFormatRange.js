import { format } from "date-fns";
import React from "react";

const useFormatRange = (data) => {
  return data?.map((item) => ({
    ...item,
    range: `${format(new Date(item.start), "d.M")}-${format(
      new Date(item.end),
      "d.M"
    )}`,
  }));
};

export default useFormatRange;
