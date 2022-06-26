import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

ListUsers.propTypes = {};

function ListUsers(props) {
  return (
    <div className="bee-card list-users-container">
        <div className="bee-card-header">
          <h3 className="bee-card-title">DANH SÁCH NGƯỜI DÙNG</h3>
        </div>
        <div className="bee-card-body"></div>
      </div>
  );
}

export default ListUsers;
