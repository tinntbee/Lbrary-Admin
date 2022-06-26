import React from "react";

ArrowUpIcon.propTypes = {};

function ArrowUpIcon(props) {
  return (
    <svg {...props} className={"icon arrow-up-icon " + props.className}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.4142L5.7071 15.7071C5.3166 16.0976 4.6834 16.0976 4.2929 15.7071C3.9024 15.3166 3.9024 14.6834 4.2929 14.2929L11.2929 7.2929C11.6834 6.9024 12.3166 6.9024 12.7071 7.2929L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071Z"
        />
      </svg>
    </svg>
  );
}

export default ArrowUpIcon;
