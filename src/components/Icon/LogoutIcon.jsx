import React from "react";

LogoutIcon.propTypes = {};

function LogoutIcon(props) {
  return (
    <svg {...props} className={"icon logout-icon " + props.className}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.3537V10.4995L12.0005 11.0045L19.442 11.0035L17.7196 9.27977C17.4534 9.01346 17.4292 8.59679 17.6471 8.30321L17.7198 8.21911C17.9861 7.95289 18.4027 7.92875 18.6963 8.14666L18.7804 8.21929L21.777 11.2169C22.043 11.483 22.0674 11.8992 21.85 12.1928L21.7775 12.2769L18.7809 15.2803C18.4884 15.5736 18.0135 15.5741 17.7203 15.2816C17.4537 15.0156 17.429 14.599 17.6465 14.3051L17.7191 14.2209L19.432 12.5035L12.0005 12.5045L12 19.2495C12 19.7159 11.5788 20.0692 11.1196 19.9881L2.61955 18.4868C2.26121 18.4235 2 18.1121 2 17.7482V5.74953C2 5.38222 2.26601 5.06896 2.62847 5.00944L11.1285 3.61361C11.5851 3.53863 12 3.89097 12 4.3537ZM8.50215 11.4995C7.94868 11.4995 7.5 11.9482 7.5 12.5017C7.5 13.0552 7.94868 13.5038 8.50215 13.5038C9.05562 13.5038 9.5043 13.0552 9.5043 12.5017C9.5043 11.9482 9.05562 11.4995 8.50215 11.4995ZM13 18.5008L13.7652 18.501L13.867 18.4941C14.2335 18.4443 14.5158 18.1299 14.5152 17.7497L14.508 13.4995H13V18.5008ZM13.002 9.99953L13 8.72487V4.99952L13.7453 4.99953C14.1245 4.99953 14.4381 5.28105 14.4883 5.64664L14.4953 5.74829L14.502 9.99953H13.002Z"
        />
      </svg>
    </svg>
  );
}

export default LogoutIcon;
