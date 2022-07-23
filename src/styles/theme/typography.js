import breakpoints from './variables/breakpoints';

export default (textColor) => ({
  fontFamily: '"Museo Sans 300"',
  fontSize: 16,
  h1: {
    fontFamily: '"Museo Sans 900"',
    fontWeight: 600,
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: '2px',
    lineHeight: '32px',
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 20,
    },
  },
  h2: {
    fontFamily: '"Museo Sans 700"',
    color: textColor,
    fontWeight: 600,
    fontSize: 28,
    letterSpacing: '4px',
    lineHeight: '32px',
  },
  h3: {
    fontFamily: '"Museo Sans 700"',
    color: textColor,
    fontWeight: 600,
    fontSize: 32,
    letterSpacing: '-0.06px',
    lineHeight: '40px',
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 24,
    },
    '@media (max-width:400px)': {
      fontSize: 20,
    },
  },
  h4: {
    fontFamily: '"Museo Sans 700"',
    color: textColor,
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: '-0.06px',
    lineHeight: '24px',
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 20,
    },
  },
  h5: {
    fontFamily: '"Museo Sans 700"',
    color: textColor,
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: '-0.05px',
    lineHeight: '32px',
    [`@media (max-width: ${breakpoints.values.xs}px)`]: {
      fontSize: 18,
      lineHeight: '24px',
    },
  },
  h6: {
    fontFamily: '"Museo Sans 700"',
    color: textColor,
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: '-0.05px',
    lineHeight: '24px',
  },
  button: {
    color: textColor,
    fontFamily: '"Museo Sans 300"',
    textTransform: 'none',
  },
  overline: {
    fontWeight: 500,
  },
  body2: {
    color: textColor,
    lineHeight: '1.5',
  },
});
