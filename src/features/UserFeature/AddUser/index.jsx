import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import AddOneUser from "./AddOneUser";
import AddMultiUser from "./AddMultiUser";

AddUser.propTypes = {};

function AddUser(props) {
  const [tab, setTab] = React.useState(0);
  return (
    <div className="add-user-container">
      <div className="tabs-bar">
        <ul>
          <li className={tab === 0 ? "active" : ""} onClick={() => setTab(0)}>
            Tạo tài khoản
          </li>
          <li className={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>
            Nhập danh sách tài khoản
          </li>
        </ul>
      </div>
      <div className="tab-content" style={{"--tab": tab}}>
        <div className="tab">
          <AddOneUser className={tab === 0 ? "active" : ""} />
        </div>
        <div className="tab">
          <AddMultiUser className={tab === 1 ? "active" : ""} />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
