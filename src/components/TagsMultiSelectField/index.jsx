import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

TagsMultiSelectField.propTypes = {};

TagsMultiSelectField.defaultProps = {
  label: "Thẻ Sách",
  value: [
    {
      _id: "1",
      name: "KHOA HỌC",
    },
  ],
  options: [
    {
      _id: "1",
      name: "KHOA HỌC",
    },
    {
      _id: "2",
      name: "VĂN HỌC",
    },
  ],
};

function TagsMultiSelectField(props) {
  const { label, options, value, setValue } = props;
  function isChecked(_id) {
    if (value.findIndex((tag) => tag._id === _id) > -1) {
      return true;
    } else {
      return false;
    }
  }
  function handleTagsChange(checkedTag, e) {
    let newValue = [...value];
    if (e.target.checked) {
      newValue.push(checkedTag);
    } else {
      if (newValue.length > 1) {
        const index = newValue.findIndex((tag) => tag._id === checkedTag._id);
        if (index > -1) {
          // only splice array when item is found
          newValue.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    }
    setValue(newValue);
  }
  return (
    <div className="tags-multi-select-field">
      <label>{label}</label>
      <div className="tags-multi-select-field__container">
        <div className="tags-content">
          <div className="values">
            {value.map((item, index) => (
              <span>{"#" + item.name}</span>
            ))}
          </div>
          <div className="tags bee-scroll">
            {options &&
              options.map((item, index) => {
                return (
                  <div
                    className={
                      isChecked(item._id) ? "bee-check checked" : "bee-check"
                    }
                  >
                    <input
                      type="checkbox"
                      id={item._id}
                      checked={isChecked(item._id)}
                      onChange={(e) => handleTagsChange(item, e)}
                    />
                    <label htmlFor={item._id}>{item.name}</label>
                  </div>
                );
              })}
          </div>
        </div>
        <fieldset aria-hidden="true" className="notched-outline">
          <legend>
            <span>{label}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
}

export default TagsMultiSelectField;
