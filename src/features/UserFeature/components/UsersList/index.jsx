import React from "react";
import PropTypes from "prop-types";
import UserDetail from "./UserDetail";
import { useEffect } from "react";
import adminAPI from "../../../../api/adminAPI";
import { useState } from "react";
import moment from "moment";

UsersList.propTypes = {};

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const handleUserClick = (_id, index) => {
    setUser({ _id, index });
  };
  const handleUpdateUsersList = (res, index) => {
    let newUsers = [...users];
    // alert(index + "," + res.is_banned);
    newUsers[index].is_banned = res.is_banned;
    setUsers([...newUsers]);
  };

  useEffect(() => {
    adminAPI
      .getAllUser()
      .then((res) => setUsers(res))
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  useEffect(() => {
    if (users.length > 0) {
      console.log({ users });
      window.rawTable();
    }
  }, [users]);
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
                  <th></th>
                  <th>Họ và Tên</th>
                  <th>Tên hiển thị</th>
                  <th>Khoa</th>
                  <th>Ngày Sinh</th>
                  <th>Email</th>
                  <th>Giới tính</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item, index) => {
                    return (
                      <tr
                        onClick={() => handleUserClick(item._id, index)}
                        key={item._id}
                        style={{ cursor: "pointer" }}
                      >
                        <td class="align-middle">
                          <div className="image">
                            <img
                              src={item.avatar}
                              className="img-circle elevation-2"
                              alt="User Image"
                              style={{ height: "50px", width: "50px" }}
                            />
                          </div>
                        </td>
                        <td class="align-middle">{item.name}</td>
                        <td class="align-middle">{item.nickname}</td>
                        <td class="align-middle">{item.faculty}</td>
                        <td class="align-middle">
                          {moment(item.dob).format("DD/MM/YYYY")}
                        </td>
                        <td class="align-middle">{item.email}</td>
                        <td class="align-middle">
                          {item.gender === "male" ? (
                            <>
                              <i class="fas fa-mars"></i> Nam
                            </>
                          ) : (
                            <>
                              <i class="fas fa-venus"></i> Nữ
                            </>
                          )}
                        </td>
                        <td class="align-middle">
                          {item.is_banned ? (
                            <span
                              class="badge bg-warning"
                            >
                              <i className="fas fa-lock"></i> Khóa
                            </span>
                          ) : (
                            <span
                              class="badge bg-success"
                            >
                              {" "}
                              Hoạt động
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Họ và Tên</th>
                  <th>Tên hiển thị</th>
                  <th>Khoa</th>
                  <th>Ngày Sinh</th>
                  <th>Email</th>
                  <th>Giới tính</th>
                  <th>Trạng thái</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {user && (
        <div class="col-md-3">
          <UserDetail
            _id={user._id}
            index={user.index}
            handleUpdateUsersList={handleUpdateUsersList}
          />
        </div>
      )}
    </div>
  );
}

export default UsersList;
