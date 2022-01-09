import React from "react";
import PropTypes from "prop-types";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box">
          <span className="info-box-icon bg-info elevation-1">
            <i className="fas fa-users" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Người dùng mới</span>
            <span className="info-box-number">10</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box mb-3">
          <span className="info-box-icon bg-danger elevation-1">
            <i className="fas fa-thumbs-up" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Tương tác trên diễn đàn</span>
            <span className="info-box-number">41,410</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      <div className="clearfix hidden-md-up" />
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box mb-3">
          <span className="info-box-icon bg-success elevation-1">
            <i className="fas fa-stopwatch" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Số giờ Pomodoro</span>
            <span className="info-box-number">760</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box mb-3">
          <span className="info-box-icon bg-warning elevation-1">
            <i className="fas fa-dollar-sign" />
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Số hoa tạo mới</span>
            <span className="info-box-number">2,000</span>
          </div>
          {/* /.info-box-content */}
        </div>
        {/* /.info-box */}
      </div>
    </div>
  );
}

export default Header;
