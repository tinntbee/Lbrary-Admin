import React from "react";
import PropTypes from "prop-types";

Nav.propTypes = {};

function Nav(props) {
  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="#" role="button">
            Đăng xuất <i className="fas fa-sign-out-alt" />
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
