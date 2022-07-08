import React from "react";

CartIcon.propTypes = {};

function CartIcon(props) {
  return (
    <svg {...props} className={"icon cart-icon " + props.className}>
      <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M6.77051 11.5098C6.77051 10.3879 7.67994 9.47852 8.80176 9.47852H10.3137C12.8879 9.47852 14.4292 11.2091 15.3106 12.8179C15.898 13.8902 16.323 15.134 16.6554 16.26C16.7455 16.253 16.8367 16.2493 16.9289 16.2493H50.7758C53.0242 16.2493 54.6479 18.4009 54.0315 20.5632L49.0812 37.9212C48.169 41.1205 45.2456 43.3267 41.919 43.3267H25.8095C22.4552 43.3267 19.5148 41.0845 18.6271 37.8499L16.5675 30.3449L13.1588 18.8379L13.1532 18.8178C12.7315 17.2799 12.3358 15.8432 11.7477 14.7698C11.1766 13.7273 10.7213 13.541 10.3137 13.541H8.80176C7.67994 13.541 6.77051 12.6316 6.77051 11.5098ZM24.3747 56.8743C27.3663 56.8743 29.7913 54.4493 29.7913 51.4577C29.7913 48.4661 27.3663 46.041 24.3747 46.041C21.3831 46.041 18.958 48.4661 18.958 51.4577C18.958 54.4493 21.3831 56.8743 24.3747 56.8743ZM43.333 56.8743C46.3246 56.8743 48.7497 54.4493 48.7497 51.4577C48.7497 48.4661 46.3246 46.041 43.333 46.041C40.3414 46.041 37.9163 48.4661 37.9163 51.4577C37.9163 54.4493 40.3414 56.8743 43.333 56.8743Z" />
        </g>
      </svg>
    </svg>
  );
}

export default CartIcon;