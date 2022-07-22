import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import styles from "./Overview.module.scss";
const Overview = () => {
  const classes = useStyles();
  return (
    <div>
      Overview
      <Box className={styles.yo}>div</Box>
    </div>
  );
};

export default Overview;

const useStyles = makeStyles(
  (theme) => ({
    yo: { border: "1px solid red" },
  }),
  { name: "Overview" }
);
