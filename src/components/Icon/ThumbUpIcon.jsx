import React from "react";

ThumbUpIcon.propTypes = {};

function ThumbUpIcon(props) {
  return (
    <svg {...props} className={"icon thumb-up-icon " + props.className}>
      <svg
        viewBox="0 0 34 34"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.3294 12.7542C21.9822 10.7326 22.3119 8.96295 22.3119 7.43709C22.3119 4.03897 20.9815 1.41992 18.7702 1.41992C17.5706 1.41992 17.1993 2.13426 16.7347 3.8946C16.7591 3.80261 16.504 4.79269 16.4295 5.05796C16.2864 5.56618 16.0373 6.43141 15.6827 7.65189C15.6732 7.68459 15.6594 7.7154 15.6411 7.74385L11.5799 14.0985C10.6193 15.6016 9.202 16.7569 7.53617 17.3946L5.7551 18.0766C4.63115 18.5069 3.97861 19.6823 4.2077 20.8638L5.17976 25.8769C5.41654 27.0981 6.34206 28.0699 7.5502 28.366L19.237 31.2304C22.8229 32.1093 26.4473 29.9348 27.3595 26.3572L29.5892 17.6127C30.1207 15.5278 28.8614 13.4066 26.7766 12.875C26.462 12.7948 26.1387 12.7542 25.814 12.7542H21.3294Z"
        />
      </svg>
    </svg>
  );
}

export default ThumbUpIcon;
