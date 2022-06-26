import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import CloseIcon from "../../../../components/Icon/CloseIcon";
import FlowerIcon from "../../../../components/Icon/FlowerIcon";

UserDetail.propTypes = {};

function UserDetail(props) {
  return (
    <div className="bee-card user-detail-container">
      <div className="bee-card-header">
        <h3 className="bee-card-title">THÔNG TIN NGƯỜI DÙNG</h3>
        <div className="bee-card-actions">
          <button className="bee-btn close-btn">
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="bee-card-body">
        <div className="col user-information">
          <div className="intro-section section">
            <div
              className="avatar"
              style={{
                backgroundImage: `url("${"https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-6/287989341_3336456443345909_182981152520210357_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lHp3nXIbIpkAX9rQFVh&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT9C1VdFvQqQAdIbUheFOHnJnMnzibnEzPEq7BMihAMXTQ&oe=62BCB18A"}")`,
              }}
            />
            <div className="col intro">
              <p className="name">Nguyễn Trung Tín</p>
              <p className="email">18110381@student.hcmute.edu.vn</p>
              <div className="tag status bg-green">
                <div className="icon status-icon" />
                <p>Đang truy cập</p>
              </div>
              <div className="tag flower bg-yellow">
                <FlowerIcon />
                <p>
                  238 <span>Hoa tích lũy</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bee-scroll">
            <div className="col more-section ">
              <div className="detail-section section"></div>
              <div className="bookcase-section section"></div>
              <div className="pomodoro-section section"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
