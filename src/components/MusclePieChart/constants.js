import {
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  setDate,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const getRange = (dif, month) => {
  const date = new Date();
  let startOn = new Date();
  let endOn = new Date();

  if (month) {
    startOn = startOfMonth(date, { weekStartsOn: 1 });
    endOn = endOfMonth(date, { weekStartsOn: 1 });

    const start = differenceInCalendarDays(date, startOn);
    const end = differenceInCalendarDays(date, endOn);

    return { start, end };
  } else {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - dif);
    startOn = startOfWeek(startDate, { weekStartsOn: 1 });
    endOn = endOfWeek(startDate, { weekStartsOn: 1 });

    const start = differenceInCalendarDays(date, startOn);
    const end = differenceInCalendarDays(date, endOn);

    return { start, end };
  }
};

export const VALUES = [
  {
    id: "this_week",
    label: "This week",
    start: getRange(0).start,
    end: getRange(0).end,
  },
  {
    id: "last_week",
    label: "Last week",
    start: getRange(7).start,
    end: getRange(7).end,
  },
  {
    id: "this_month",
    label: "This month",
    start: getRange(0, true).start,
    end: getRange(0, true).end,
  },
];
