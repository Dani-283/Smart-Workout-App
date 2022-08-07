import breakpoints from "./variables/breakpoints";

export default (textColor) => ({
  fontSize: 16,
  h1: {
    fontWeight: 600,
    fontWeight: 600,
    fontSize: 38,
    letterSpacing: "1.5px",
    lineHeight: "32px",
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 20,
    },
  },
  h2: {
    color: textColor,
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: "4px",
    lineHeight: "32px",
  },
  h3: {
    color: textColor,
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: "-0.06px",
    lineHeight: "40px",
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 24,
    },
    "@media (max-width:400px)": {
      fontSize: 20,
    },
  },
  h4: {
    color: textColor,
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: "-0.06px",
    lineHeight: "24px",
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 20,
    },
  },
  h5: {
    color: textColor,
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: "-0.05px",
    lineHeight: "32px",
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 18,
      lineHeight: "24px",
    },
  },
  h6: {
    color: textColor,
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: "-0.05px",
    lineHeight: "24px",
  },
  button: {
    color: textColor,
    fontFamily: '"Museo Sans 300"',
    textTransform: "none",
  },
  overline: {
    fontWeight: 500,
  },
  body2: {
    color: textColor,
    lineHeight: "1.5",
  },
});
