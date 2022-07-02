import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "5px 0",
  },
  field: {
    fontSize: "16px",
    padding: theme.spacing(1.5),
    '& input[type="time"]::-webkit-calendar-picker-indicator': {
      filter:
        "invert(78%) sepia(66%) saturate(6558%) hue-rotate(84deg) brightness(127%) contrast(116%)",
    },
    "& .MuiSelect-select": {
      color: "white",
    },
    "& .MuiSelect-icon": {
      fill: "#E0E0E0",
    },
    "& .Mui-error": { color: "var(--red-color)" },
    "& input": { color: "white" },
    "& label": {
      color: "#E0E0E0",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E0E0",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& ::-webkit-calendar-picker-indicator": {
      filter: `invert(86%) sepia(0%) saturate(64%) hue-rotate(138deg) brightness(101%) contrast(102%)`,
    },
  },
}));

export default useStyles;
