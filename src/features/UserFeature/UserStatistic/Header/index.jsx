import React from "react";
import PropTypes from "prop-types";
import adminAPI from "../../../../api/adminAPI";
import { useEffect } from "react";
import { useState } from "react";
import AddPersonIcon from "../../../../components/Icon/AddPersonIcon";
import SmileFaceIcon from "../../../../components/Icon/SmileFaceIcon";
import TimeIcon from "../../../../components/Icon/TimeIcon";
import FlowerIcon from "../../../../components/Icon/FlowerIcon";
import "./style.scss";

Header.propTypes = {};

function Header(props) {
  const [data, setData] = useState({
    totalHoa: 0,
    totalHourPomodoro: 0,
    totalNewUsers: 0,
    totalReach: 0,
  });
  const fetchData = async () => {
    adminAPI
      .userStatistical()
      .then((res) => {
        setData({ ...data, ...res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="user-header">
      <div className="box new-users-box">
        <span className="icon-container">
          <AddPersonIcon />
        </span>
        <div className="content">
          <p className="title">Người dùng mới</p>
          <p className="value">{data.totalNewUsers}</p>
        </div>
      </div>

      <div className="box react-forum-box">
        <span className="icon-container">
          <SmileFaceIcon />
        </span>
        <div className="content">
          <p className="title">Tương tác trên diễn đàn</p>
          <p className="value">{data.totalReach}</p>
        </div>
      </div>

      <div className="box hour-pomodoro-box">
        <span className="icon-container">
          <TimeIcon />
        </span>
        <div className="content">
          <p className="title">Số giờ Pomodoro</p>
          <p className="value">{data.totalHourPomodoro}</p>
        </div>
      </div>

      <div className="box created-flowers-box">
        <span className="icon-container">
          <FlowerIcon />
        </span>
        <div className="content">
          <p className="title">Số hoa tạo mới</p>
          <p className="value">{data.totalHoa}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
