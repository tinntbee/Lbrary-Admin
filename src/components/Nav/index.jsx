import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import adminAPI from "../../api/adminAPI";
import LogoutIcon from "../Icon/LogoutIcon";
import "./style.scss";
import FullScreenIcon from "../Icon/FullScreenIcon";
import NormalScreenIcon from "../Icon/NormalScreenIcon";

Nav.propTypes = {};

function Nav(props) {
  const history = useHistory();
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const handleLogoutClick = () => {
    adminAPI.logout();
    history.replace("/login");
  };
  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.body.requestFullscreen();
      setIsFullScreen(true);
    }
  };
  return (
    <div className="bee-nav">
      <ul className="items-left"></ul>
      <ul className="items-right">
        <li className="item">
          <button onClick={handleLogoutClick} className="logout-btn">
            Đăng xuất <LogoutIcon />
          </button>
        </li>
        <li className="item">
          <button className="full-screen-btn" onClick={handleFullScreen}>
            {isFullScreen ? <NormalScreenIcon /> : <FullScreenIcon />}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
