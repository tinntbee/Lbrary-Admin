import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SelectField.defaultProp = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  option: [],
};

const CustomSelectField = withStyles({
  root: {},
})(Select);

function SelectField(props) {
  const { field, form, type, label, disabled, placeholder, options } = props;
  console.log(form);
  const { name } = field;
  const { errors, touched } = form;
  const error = touched[name] && errors[name];
  return (
    <FormControl size="small" variant="outlined" fullWidth>
      <InputLabel style={{ fontSize: 16 }}>{label}</InputLabel>
      <CustomSelectField
        style={{ fontSize: 16, textAlign: "left" }}
        id={name}
        {...field}
        label={label}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        form={form}
        error={error}
        helperText={error}
        dir="ltr"
      >
        {options.map((item, index) => {
          return <MenuItem key={index} style={{ fontSize: 16, textAlign: "left" }} value={item.value}>{item.label}</MenuItem>;
        })}
      </CustomSelectField>
    </FormControl>
  );
}

export default SelectField;
