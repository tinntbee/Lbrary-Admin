import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import adminAPI from "../../api/adminAPI";
import { useHistory } from "react-router-dom";

Sidebar.propTypes = {};

function Sidebar(props) {
  const history = useHistory();
  const [admin, setAdmin] = useState({
    avatar: "dist/img/user2-160x160.jpg",
    name: "Admin",
  });
  useEffect(() => {
    adminAPI
      .reSign()
      .then((res) => {
        setAdmin(res.admin);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          history.replace("/login");
        }
      });
  }, []);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={admin.avatar}
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {admin.name}
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
