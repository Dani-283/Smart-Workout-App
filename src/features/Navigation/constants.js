import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SettingsIcon from "@mui/icons-material/Settings";
import TimelineIcon from "@mui/icons-material/Timeline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Overview from "@features/Overview";
import History from "@features/History";
import Charts from "@features/Charts";
import Settings from "@features/Settings";

export const TABNAMES = {
  OVERVIEW: "overview",
  HISTORY: "history",
  CHARTS: "charts",
  SETTINGS: "settings",
};

export const TABS = [
  {
    icon: <FitnessCenterIcon />,
    title: "Overview",
    id: TABNAMES.OVERVIEW,
    component: <Overview key={TABNAMES.OVERVIEW} />,
  },
  {
    icon: <AccessTimeFilledIcon />,
    title: "History",
    id: TABNAMES.HISTORY,
    component: <History key={TABNAMES.HISTORY} />,
  },
  {
    icon: <TimelineIcon />,
    title: "Charts",
    id: TABNAMES.CHARTS,
    component: <Charts key={TABNAMES.CHARTS} />,
  },
  {
    icon: <SettingsIcon />,
    title: "Settings",
    id: TABNAMES.SETTINGS,
    component: <Settings key={TABNAMES.SETTINGS} />,
  },
];
