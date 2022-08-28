import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      "*, *::after, *::before": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        backgroundColor: theme.palette.background.primary,
        height: "100%",
        width: "auto",
      },
      "svg[data-type=filled-icon] *": {
        fill: theme.palette.primary.main,
      },
      "svg[data-type=icon] *": {
        stroke: theme.palette.primary.main,
      },
      "svg[data-type=reverse-icon] *": {
        stroke: theme.palette.common.white,
      },

      a: {
        textDecoration: "none",
        color: "inherit",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      "#__next": {
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      },

      ".noHoverButton": {
        "&:hover": {
          background: "none",
        },
      },

      desktopHidden: {
        [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
          display: "none",
        },
      },

      mobileHidden: {
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
          display: "none",
        },
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
