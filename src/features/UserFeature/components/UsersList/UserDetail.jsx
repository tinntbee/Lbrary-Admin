import React from "react";
import PropTypes from "prop-types";

UserDetail.propTypes = {};

function UserDetail(props) {
  return (
    <div class="card card-warning card-outline">
      <div class="card-body box-profile">
        <div class="text-center">
          <img
            class="profile-user-img img-fluid img-circle"
            src="../../dist/img/user4-128x128.jpg"
            alt="User profile picture"
          />
        </div>

        <h3 class="profile-username text-center">Nina Mcintire</h3>

        <p class="text-muted text-center">Software Engineer</p>

        <ul class="list-group list-group-unbordered mb-3">
          <li class="list-group-item">
            <b>Họ và Tên</b>{" "}
            <a class="text-warning float-right">Nguyễn Trung Tín</a>
          </li>
          <li class="list-group-item">
            <b>Khoa</b> <a class="text-warning float-right">Nguyễn Trung Tín</a>
          </li>
          <li class="list-group-item">
            <b>Ngày Sinh</b> <a class="text-warning float-right">27/09/2000</a>
          </li>
          <li class="list-group-item">
            <b>Ngày tham gia</b>{" "}
            <a class="text-warning float-right">27/09/2021</a>
          </li>
          <li class="list-group-item">
            <b>Số giờ Pomodoro</b>{" "}
            <a class="text-warning float-right">27/09/2021</a>
          </li>
          <li class="list-group-item">
            <b>Số hoa tích lũy</b>{" "}
            <a class="text-warning float-right">27/09/2021</a>
          </li>
          <li class="list-group-item">
            <b>Số sách</b> <a class="text-warning float-right">27/09/2021</a>
          </li>
          <li class="list-group-item">
            <b>Số Note</b> <a class="text-warning float-right">27/09/2021</a>
          </li>
        </ul>

        <a href="#" class="btn btn-primary btn-block btn-danger">
          <b>
            <i class="fas fa-lock"></i> Khóa người dùng này
          </b>
        </a>
      </div>
    </div>
  );
}

export default UserDetail;
