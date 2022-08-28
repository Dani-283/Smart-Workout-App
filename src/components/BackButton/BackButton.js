import { makeStyles } from "@mui/styles";
import Back from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const BackButton = () => {
  const classes = useStyles();
  const router = useRouter();

  return <Back className={classes.back} onClick={() => router.back()} />;
};

const useStyles = makeStyles((theme) => ({
  back: {
    marginBottom: 24,
    [theme.breakpoints.up(theme.breakpoints.values.sm)]: { display: "none" },
  },
}));

export default BackButton;
