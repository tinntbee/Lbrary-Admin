import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListUsers from "./ListUsers";
import UserDetail from "./UserDetail";

UserList.propTypes = {};

function UserList(props) {
  return (
    <div className="row user-list-container">
      <ListUsers />
      <UserDetail />
    </div>
  );
}

export default UserList;
