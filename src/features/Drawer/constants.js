import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SettingsIcon from "@mui/icons-material/Settings";
import TimelineIcon from "@mui/icons-material/Timeline";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Overview from "@features/Overview";
import History from "@features/History";
import Charts from "@features/Charts";
import Settings from "@features/Settings";

export const ITEMS = [
  {
    icon: <FitnessCenterIcon />,
    title: "Overview",
    id: 0,
    component: <Overview />,
  },
  {
    icon: <AccessTimeFilledIcon />,
    title: "History",
    id: 1,
    component: <History />,
  },
  {
    icon: <TimelineIcon />,
    title: "Charts",
    id: 2,
    component: <Charts />,
  },
  {
    icon: <SettingsIcon />,
    title: "Settings",
    id: 3,
    component: <Settings />,
  },
];
