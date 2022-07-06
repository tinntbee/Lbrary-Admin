import React from "react";

ArrowLeftIcon.propTypes = {};

function ArrowLeftIcon(props) {
  return (
    <svg {...props} className={"icon arrow-left-icon " + props.className}>
      <svg
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7803 3.21967C12.0732 3.51256 12.0732 3.98743 11.7803 4.28033L7.06066 9L11.7803 13.7197C12.0732 14.0125 12.0732 14.4874 11.7803 14.7803C11.4875 15.0732 11.0125 15.0732 10.7197 14.7803L5.46967 9.53032C5.17678 9.23745 5.17678 8.76255 5.46967 8.46967L10.7197 3.21967C11.0125 2.92678 11.4875 2.92678 11.7803 3.21967Z"
        />
      </svg>
    </svg>
  );
}

export default ArrowLeftIcon;
