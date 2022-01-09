import React from "react";
import PropTypes from "prop-types";

Sidebar.propTypes = {};

function Sidebar(props) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href="/user" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>
                  User
                  <span className="badge badge-info right">2</span>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/book" className="nav-link">
                <i className="nav-icon fas fa-book" />
                <p>Book</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/category" className="nav-link">
                <i className="nav-icon fas fa-tags" />
                <p>Categories & Tags</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Sidebar;
