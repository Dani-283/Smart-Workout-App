import { useField } from "formik";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";

const TextField = ({
  name,
  label,
  className,
  fullWidth,
  autoFocus,
  type,
  onValueChanged,
  description,
  containerClassName,
  placeholder,
  disabled,
  labelIcon,
  onKeyDown,
}) => {
  const classes = useStyles();
  const [field, meta] = useField(name);
  const isError = !!meta.error;
  return (
    <fieldset
      className={
        containerClassName
          ? `${classes.container} ${containerClassName}`
          : classes.container
      }
      style={{ width: fullWidth ? "100%" : "" }}
    >
      {label && (
        <label htmlFor={field.name} className={classes.label}>
          {labelIcon}
        </label>
      )}
      {description && <p className={classes.description}>{description}</p>}
      <Box position="relative">
        <input
          autoFocus={autoFocus}
          id={field.name}
          name={field.name}
          value={field.value}
          onChange={(e) => {
            if (!onValueChanged) return field.onChange(e);
            onValueChanged(e.target.value);
          }}
          onKeyDown={onKeyDown}
          onBlur={field.onBlur}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${classes.input}${
            isError ? " " + classes.inputError : ""
          }${className ? " " + className : ""}`}
        />
      </Box>
    </fieldset>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  onValueChanged: PropTypes.func,
  description: PropTypes.string,
  fullWidth: PropTypes.bool,
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  labelIcon: PropTypes.any,
  onKeyDown: PropTypes.func,
};

export default TextField;

const useStyles = makeStyles(
  (theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      border: 0,
      background: "transparent",
      padding: 0,
      position: "relative",
      maxWidth: 150,

      "& input::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },

      "& input::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
    label: {
      color: theme.palette.common.black,
      fontSize: 14,
      lineHeight: "24px",
      marginBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: theme.spacing(0.5),
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      padding: 0,
      color: theme.palette.grey[600],
      marginBottom: 8,
    },
    input: {
      color: theme.palette.common.black,
      "&::placeholder": {
        color: theme.palette.common.black,
        opacity: 0.5,
      },
      fontFamily: theme.typography.fontFamily,
      border: `1px solid ${theme.palette.common.black}`,
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      background: "transparent",
      textAlign: "center",
      resize: "none",
      width: "100%",
      "&:hover, &:focus": {
        outlineWidth: 0,
      },
    },
    inputError: {
      border: `1px solid #D91A5B!important`,
    },

    requiredIcon: {
      margin: theme.spacing(0, 0, 0.5, 0.25),
    },
  }),
  { name: "MuiEndTextField" }
);
