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
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLoginClick = async () => {
    if (loginData.username || loginData.password) {
      setLoading(true);
      const passwordHashed = await hashIt(loginData.password);
      adminAPI
        .login({ username: loginData.username, password: passwordHashed })
        .then((res) => {
          history.push("/user/statistic");
        })
        .catch((err) => {
          console.log({ err });
          setMessage("Sai tài khoản hoặc mật khẩu !!");
          setLoading(false);
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
      style={{ backgroundImage: `url('assets/png/hcmuteBackground.png')` }}
    >
      <div className="login-box">
        <img className="logo" alt="logo" src="assets/svg/logo.svg" />
        <h1>ADMIN LOGIN</h1>
        <h2>With Bee Library account</h2>
        {message && (
          <div className="message">
            <i class="icon fas fa-exclamation-triangle"></i>
            <div className="error-content">
              <p>{message}</p>
            </div>
            <i
              class="icon fas fa-times"
              style={{ float: "right", cursor: "pointer" }}
              onClick={handleCloseMessageClick}
            ></i>
          </div>
        )}
        <div className="form-input">
          <input
            type="text"
            placeholder="Tài khoản"
            value={loginData.username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-input">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Mật khẩu"
            value={loginData.password}
            onChange={handlePasswordChange}
          />
          <button
            className="btn-right"
            style={{
              backgroundImage: passwordVisible
                ? 'url("assets/svg/password-visible.svg")'
                : 'url("assets/svg/password-invisible.svg")',
            }}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        <button
          className="submit"
          onClick={handleLoginClick}
          disabled={!loginData.username || !loginData.password || loading}
        >
          {loading ? (
            <img className="loader" alt="loading" src="assets/svg/loader.svg" />
          ) : (
            <img alt="submit" src="assets/svg/arrowRight.svg" />
          )}
        </button>
      </div>
    </div>
  );
}

export default LoginFeature;
