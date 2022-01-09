import React from "react";
import PropTypes from "prop-types";
import UserDetail from "./UserDetail";

UsersList.propTypes = {};

function UsersList(props) {
  return (
    <div className="row">
      <div class="col-md-9">
        <div class="card card-warning card-outline">
          <div class="card-header">
            <h3 class="card-title">DANH SÁCH NGƯỜI DÙNG</h3>
          </div>
          <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Họ và Tên</th>
                  <th>Khoa</th>
                  <th>Ngày Sinh</th>
                  <th>Email</th>
                  <th>Tên hiển thị</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nguyễn Trung Tín</td>
                  <td>Công nghệ Thông tin</td>
                  <td>27/09/2000</td>
                  <td>18110381@student.hcmute.edu.vn</td>
                  <td>Bee</td>
                  <td>
                    <span class="badge bg-warning">
                      <i className="fas fa-lock"></i> Khóa
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Họ và Tên</th>
                  <th>Khoa</th>
                  <th>Ngày Sinh</th>
                  <th>Email</th>
                  <th>Tên hiển thị</th>
                  <th>Trạng thái</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <UserDetail />
      </div>
    </div>
  );
}

export default UsersList;
