import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListUsers from "./ListUsers";
import UserDetail from "./UserDetail";
import adminAPI from "../../../api/adminAPI";
import { useSnackbar } from "notistack";

UserList.propTypes = {};

function UserList(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({
    name: "",
    avatar: "",
    nickname: "",
    faculty: "",
    email: "",
    gender: "",
    dob: "1900/01/01",
    hoa: 0,
    is_banned: 0,
    tags: [],
    books: [],
  });
  const [usersPending, setUsersPending] = React.useState(false);
  const [userPending, setUserPending] = React.useState(false);
  const [showUserDetail, setShowUserDetail] = React.useState(false);
  function handleViewUserDetail(_id) {
    if (_id !== user._id) fetchUserData(_id);
    setShowUserDetail(true);
  }
  function handleBanUser(_id, is_banned, name) {
    adminAPI
      .banUser({ _id, is_banned })
      .then((res) => {
        console.log({ res });
        let newUsers = [...users];
        newUsers.find((e) => e._id === _id).is_banned = res.is_banned;
        setUsers([...newUsers]);
        if (_id === user._id) {
          setUser({ ...user, is_banned: is_banned });
        }
        if (is_banned === 1) {
          enqueueSnackbar(`Đã khóa: "${name}"!`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Đã mở khóa: "${name}"!`, {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Thao tác thất bại!", {
          variant: "error",
        });
      });
  }
  function fetchUserData(_id) {
    setUserPending(true);
    adminAPI
      .getUserDetail(_id)
      .then((res) => {
        setUser(res);
        setUserPending(false);
      })
      .catch((err) => {
        enqueueSnackbar("Lấy dữ liệu thất bại!", {
          variant: "error",
        });
      });
  }
  function fetchUsers() {
    setUsersPending(true);
    adminAPI
      .getAllUser()
      .then((res) => {
        setUsersPending(false);
        setUsers(res);
      })
      .catch((err) => {
        console.log({ err });
        setUsersPending(false);
      });
  }
  function handleModifyUser(_user) {
    console.log({ _user });
    var newUsers = [...users];
    var index = newUsers.findIndex((e) => e._id === _user._id);
    if (index) {
      newUsers[index] = {
        ...newUsers[index],
        name: _user.name,
        nickname: _user.nickname,
        email: _user.email,
        faculty: _user.faculty,
        gender: _user.gender,
        dob: _user.dob,
      };
      setUsers([...newUsers]);
    }

    if (user._id === _user._id) {
      setUser({
        ...user,
        name: _user.name,
        nickname: _user.nickname,
        email: _user.email,
        faculty: _user.faculty,
        gender: _user.gender,
        dob: _user.dob,
      });
    }
  }
  React.useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="row user-list-container">
      <ListUsers
        users={users}
        pending={usersPending}
        handleBanUser={handleBanUser}
        handleViewUserDetail={handleViewUserDetail}
      />
      <UserDetail
        show={showUserDetail}
        user={user}
        pending={userPending}
        handleBanUser={handleBanUser}
        handleHide={() => setShowUserDetail(false)}
        handleModifyUser={handleModifyUser}
      />
    </div>
  );
}

export default UserList;
