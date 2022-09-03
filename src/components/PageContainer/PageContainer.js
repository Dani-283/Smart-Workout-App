import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const PageContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container
      maxWidth="unset"
      className={classes.container}
      sx={{ padding: 2.5, marginTop: 2, height: "100%" }}
    >
      {children}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 60,
  },
}));

export default PageContainer;
