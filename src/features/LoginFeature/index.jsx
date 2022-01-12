import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { hashIt } from "../../utils/hashPassword";
import adminAPI from "../../api/adminAPI";

LoginFeature.propTypes = {};

function LoginFeature(props) {
  const history = useHistory();
  const [message, setMessage] = useState();
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleLoginClick = async () => {
    if (loginData.username || loginData.password) {
      const passwordHashed = await hashIt(loginData.password);
      adminAPI
        .login({ username: loginData.username, password: passwordHashed })
        .then((res) => {
          history.push("/user");
        })
        .catch((err) => {
          console.log({ err });
          setMessage("Sai tài khoản hoặc mật khẩu !!");
        });
    }
  };
  const handleCloseMessageClick = () => {
    setMessage();
  };
  const handleUsernameChange = (e) => {
    setLoginData({ ...loginData, username: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setLoginData({ ...loginData, password: e.target.value });
  };
  return (
    <div
      className="login-feature"
      style={{ backgroundImage: `url('assets/thumbnail.jpg')` }}
    >
      <div className="login-box">
        <p className="title">QUẢN LÍ THƯ VIỆN</p>
        {message && (
          <p className="message">
            <i class="fas fa-exclamation-triangle"></i> {message}
            <i
              class="fas fa-times"
              style={{ float: "right", cursor: "pointer" }}
              onClick={handleCloseMessageClick}
            ></i>
          </p>
        )}
        <input
          type="text"
          placeholder="Tài khoản"
          value={loginData.username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={loginData.password}
          onChange={handlePasswordChange}
        />
        <button
          onClick={handleLoginClick}
          disabled={!loginData.username || !loginData.password}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default LoginFeature;
