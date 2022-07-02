import React from "react";

BriefcaseIcon.propTypes = {};

function BriefcaseIcon(props) {
  return (
    <svg {...props} className={"icon briefcase-icon " + props.className}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.25 3C15.6642 3 16 3.33579 16 3.75V7H17.75C19.5449 7 21 8.45507 21 10.25V16.75C21 18.5449 19.5449 20 17.75 20H6.25C4.45507 20 3 18.5449 3 16.75V10.25C3 8.45507 4.45507 7 6.25 7H8V3.75C8 3.3703 8.28215 3.05651 8.64823 3.00685L8.75 3H15.25ZM14.5 4.5H9.5V7H14.5V4.5Z"
        />
      </svg>
    </svg>
  );
}

export default BriefcaseIcon;
