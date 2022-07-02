import React from "react";

PersonIcon.propTypes = {};

function PersonIcon(props) {
  return (
    <svg {...props} className={"icon person-icon " + props.className}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.7546 14.0002C18.9966 14.0002 20.0034 15.007 20.0034 16.2491V17.1675C20.0034 17.7409 19.8242 18.2999 19.4908 18.7664C17.945 20.9296 15.4207 22.0013 12.0004 22.0013C8.5794 22.0013 6.05644 20.9292 4.51428 18.7648C4.18231 18.2989 4.00391 17.7411 4.00391 17.169V16.2491C4.00391 15.007 5.01076 14.0002 6.25278 14.0002H17.7546ZM12.0004 2.00488C14.7618 2.00488 17.0004 4.24346 17.0004 7.00488C17.0004 9.76631 14.7618 12.0049 12.0004 12.0049C9.23894 12.0049 7.00037 9.76631 7.00037 7.00488C7.00037 4.24346 9.23894 2.00488 12.0004 2.00488Z"
        />
      </svg>
    </svg>
  );
}

export default PersonIcon;
