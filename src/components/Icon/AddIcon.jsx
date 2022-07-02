import React from "react";

AddIcon.propTypes = {};

function AddIcon(props) {
  return (
    <svg {...props} className={"icon add-icon " + props.className}>
      <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 1C12.6421 1 16 4.35786 16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1ZM8.5 4.75C8.21523 4.75 7.97987 4.96161 7.9426 5.23617L7.9375 5.3125V7.9375H5.3125C5.00184 7.9375 4.75 8.18935 4.75 8.5C4.75 8.78477 4.96161 9.02013 5.23617 9.0574L5.3125 9.0625H7.9375V11.6875C7.9375 11.9981 8.18935 12.25 8.5 12.25C8.78477 12.25 9.02013 12.0384 9.0574 11.7639L9.0625 11.6875V9.0625H11.6875C11.9981 9.0625 12.25 8.81065 12.25 8.5C12.25 8.21523 12.0384 7.97987 11.7639 7.9426L11.6875 7.9375H9.0625V5.3125C9.0625 5.00184 8.81065 4.75 8.5 4.75Z" />
      </svg>
    </svg>
  );
}

export default AddIcon;