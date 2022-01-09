import React from "react";
import PropTypes from "prop-types";

Header.propTypes = {};

function Header(props) {
  return (
    <>
      <div className="row">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>150</h3>
              <p>Sách mới</p>
            </div>
            <div class="icon">
              <i class="fas fa-book-medical"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>150</h3>
              <p>Tổng số sách</p>
            </div>
            <div class="icon">
              <i class="fas fa-book"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-success">
            <div class="inner">
              <h3>150</h3>
              <p>Đã bán</p>
            </div>
            <div class="icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>2,000</h3>
              <p>Doanh thu</p>
            </div>
            <div class="icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon bg-info elevation-1">
              <i className="fas fa-comments" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Tương tác</span>
              <span className="info-box-number">10</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-danger elevation-1">
              <i className="far fa-comment" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Tương tác trung bình</span>
              <span className="info-box-number">41,410</span>
            </div>
          </div>
        </div>
        <div className="clearfix hidden-md-up" />
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-success elevation-1">
              <i className="fas fa-thumbs-up" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">
                Đánh giá tích cực trung bình
              </span>
              <span className="info-box-number">7.6</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-warning elevation-1">
              <i className="fas fa-thumbs-down" />
            </span>
            <div className="info-box-content">
              <span className="info-box-text">
                Đánh giá tiêu cực trung bình
              </span>
              <span className="info-box-number">5.5</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
