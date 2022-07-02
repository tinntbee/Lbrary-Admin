import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProp = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, disabled, placeholder } = props;
  const { name } = field;
  const { errors, touched } = form;
  const error = touched[name] && errors[name];
  return (
    <TextField
      inputProps={{ style: { fontSize: 16 } }} // font size of input text
      InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
      variant="outlined"
      size="small"
      fullWidth
      id={name}
      {...field}
      label={label}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      form={form}
      error={error}
      helperText={error}
    />
  );
}

export default InputField;
