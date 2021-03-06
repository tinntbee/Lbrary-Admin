import React from "react";

ArrowRightIcon.propTypes = {};

function ArrowRightIcon(props) {
  return (
    <svg {...props} className={"icon arrow-right-icon " + props.className}>
      <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.21967 3.21967C5.92678 3.51256 5.92678 3.98743 6.21967 4.28033L10.9394 9L6.21967 13.7197C5.92678 14.0125 5.92678 14.4874 6.21967 14.7803C6.51257 15.0732 6.98744 15.0732 7.28033 14.7803L12.5303 9.53032C12.8232 9.23745 12.8232 8.76255 12.5303 8.46967L7.28033 3.21967C6.98744 2.92678 6.51257 2.92678 6.21967 3.21967Z" />
      </svg>
    </svg>
  );
}

export default ArrowRightIcon;
