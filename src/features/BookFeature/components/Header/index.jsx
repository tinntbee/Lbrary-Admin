import React from "react";
import PropTypes from "prop-types";
import adminAPI from "../../../../api/adminAPI";
import { useEffect } from "react";
import { useState } from "react";

Header.propTypes = {};

function Header(props) {
  //   avgDislike: 0.1
  // avgLike: 0.5
  // avgReach: 1.6
  // totalBooks: 10
  // totalHoa: 40
  // totalNewBooks: 3
  // totalReach: 16
  // totalRead: 44
  const [data, setDate] = useState({
    avgDislike: 0,
    avgLike: 0,
    avgReach: 0,
    totalBooks: 0,
    totalHoa: 0,
    totalNewBooks: 0,
    totalReach: 0,
    totalRead: 0,
  });
  const fetchData = async () => {
    adminAPI
      .bookStatistical()
      .then((res) => {
        setDate({ ...data, ...res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="row">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{data.totalNewBooks}</h3>
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
              <h3>{data.totalBooks}</h3>
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
              <h3>{data.totalRead}</h3>
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
              <h3>{data.totalHoa}</h3>
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
              <span className="info-box-number">{data.totalReach}</span>
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
              <span className="info-box-number">{data.avgReach}</span>
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
              <span className="info-box-number">{data.avgLike}</span>
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
              <span className="info-box-number">{data.avgDislike}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
