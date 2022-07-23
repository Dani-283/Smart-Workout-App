import { colors } from "@mui/material";
import breakpoints from "./variables/breakpoints";
import shadows from "./shadows";
// import createTypograpy from './typography';

const constants = {
  black: "black",
  white: "white",
};

const theme = {
  breakpoints,
  palette: {
    mode: "light",
    background: {
      paper: "#ffffff",
      primary: "#ffffff",
      secondary: "#010510CC",
      paperSecondary: "#FAFAFA",
      contrast: "#000000",
    },
    primary: {
      contrast: "#ffffff",
      main: colors.common.black,
      blue: "#0288d1",
    },
    text: {
      primary: "#000000",
      secondary: "#8D8D8D",
      secondaryLight: "#dedede",
      contrast: "#ffffff",
    },

    common: {
      ...colors.common,
      white: colors.common.white,
      black: colors.common.black,
    },
    constants,
  },
  shadows,
  // typography: createTypograpy(colors.common.black),
};

export { theme };
