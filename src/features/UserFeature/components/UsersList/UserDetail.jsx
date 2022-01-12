import React from "react";
import PropTypes from "prop-types";
import adminAPI from "../../../../api/adminAPI";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";

UserDetail.propTypes = {};

function UserDetail(props) {
  const { _id, index, handleUpdateUsersList } = props;
  const [user, setUser] = useState({ listBooks: [], listNotes: [] });
  const handleBanUser = () => {
    adminAPI
      .banUser({ _id, is_banned: 1 })
      .then((res) => {
        handleUpdateUsersList(res, index);
        let newUser = { ...user };
        newUser.is_banned = res.is_banned;
        setUser({ ...newUser });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const handleOpenUser = () => {
    adminAPI
      .banUser({ _id, is_banned: 0 })
      .then((res) => {
        handleUpdateUsersList(res, index);
        let newUser = { ...user };
        newUser.is_banned = res.is_banned;
        setUser({ ...newUser });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const fetchUserData = async (_id) => {
    adminAPI
      .getUserDetail(_id)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchUserData(_id);
  }, [_id]);
  return (
    <div class="card card-warning card-outline">
      <div class="card-body box-profile">
        <div class="text-center">
          <img
            class="profile-user-img img-fluid img-circle"
            src={user?.avatar}
            alt="User profile picture"
          />
        </div>

        <h3 class="profile-username text-center">
          {user?.nickname ? user?.nickname : user?.name}
        </h3>

        <p class="text-muted text-center">{user?.name}</p>

        <ul class="list-group list-group-unbordered mb-3">
          <li class="list-group-item">
            <b>Khoa</b> <a class="text-warning float-right">{user?.faculty}</a>
          </li>
          <li class="list-group-item">
            <b>Giới tính</b>{" "}
            <a class="text-warning float-right">
              {user?.gender === "male" ? (
                <>
                  <i class="fas fa-mars"></i> Nam
                </>
              ) : (
                <>
                  <i class="fas fa-venus"></i> Nữ
                </>
              )}
            </a>
          </li>
          <li class="list-group-item">
            <b>Ngày Sinh</b>{" "}
            <a class="text-warning float-right">
              {moment(user?.dob).format("DD/MM/YYYY")}
            </a>
          </li>
          <li class="list-group-item">
            <b>Ngày tham gia</b>{" "}
            <a class="text-warning float-right">
              {" "}
              {moment(user?.createdAt).format("DD/MM/YYYY")}
            </a>
          </li>
          <li class="list-group-item">
            <b>Số giờ Pomodoro</b>{" "}
            <a class="text-warning float-right">{user?.pomodoro + " Phút"}</a>
          </li>
          <li class="list-group-item">
            <b>Số hoa tích lũy</b>{" "}
            <a class="text-warning float-right">{user?.hoa}</a>
          </li>
          <li class="list-group-item">
            <b>Số sách</b>{" "}
            <a class="text-warning float-right">{user?.listBooks.length}</a>
          </li>
          <li class="list-group-item">
            <b>Số Note</b>{" "}
            <a class="text-warning float-right">{user?.listNotes.length}</a>
          </li>
        </ul>

        {user?.is_banned ? (
          <a
            type="button"
            class="btn btn-primary btn-block btn-success"
            onClick={handleOpenUser}
            style={{ cursor: "pointer" }}
          >
            <b>Mở Khóa người dùng này</b>
          </a>
        ) : (
          <a
            type="button"
            class="btn btn-primary btn-block btn-danger"
            onClick={handleBanUser}
            style={{ cursor: "pointer" }}
          >
            <b>
              <i class="fas fa-lock"></i> Khóa người dùng này
            </b>
          </a>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
