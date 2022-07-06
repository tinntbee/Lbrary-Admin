import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import CloseIcon from "../../../../components/Icon/CloseIcon";
import FlowerIcon from "../../../../components/Icon/FlowerIcon";
import PersonIcon from "../../../../components/Icon/PersonIcon";
import PersonInfoIcon from "../../../../components/Icon/PersonInfoIcon";
import CalendarIcon from "../../../../components/Icon/CalendarIcon";
import BriefcaseIcon from "../../../../components/Icon/BriefcaseIcon";
import PersonModifyIcon from "../../../../components/Icon/PersonModify";
import LockIcon from "../../../../components/Icon/LockIcon";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import UnlockIcon from "../../../../components/Icon/UnlockIcon";
import UserModifyModal from "../UserModifyModal";

UserDetail.propTypes = {};

function UserDetail(props) {
  const { user, show, handleHide, pending, handleBanUser, handleModifyUser } = props;
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div
      className={
        show
          ? "bee-card user-detail-container"
          : "bee-card user-detail-container hidden"
      }
    >
      <div className="bee-card-header">
        <h3 className="bee-card-title">THÔNG TIN NGƯỜI DÙNG</h3>
        <div className="bee-card-actions">
          <button className="bee-btn close-btn" onClick={handleHide}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="bee-card-body">
        {pending ? (
          <LoadingAnimationIcon />
        ) : (
          <div className="col user-information">
            <div className="intro-section section">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url("${user.avatar}")`,
                }}
              />
              <div className="col intro">
                <p className="name">{user.name}</p>
                <p className="email">{user.email}</p>
                {user.is_banned === 1 ? (
                  <div className="tag status bg-red">
                    <LockIcon />
                    <p>Bị khóa</p>
                  </div>
                ) : (
                  <div className="tag status bg-blue">
                    <p>Hoạt động</p>
                  </div>
                )}
                <div className="tag flower bg-yellow">
                  <FlowerIcon />
                  <p>
                    {user.hoa} <span>Hoa tích lũy</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bee-scroll">
              <div className="col more-section ">
                <div className="detail-section section">
                  <div className="detail-row">
                    <PersonIcon />
                    <span>
                      Họ và tên người dùng là <b>{user.name}</b>
                    </span>
                  </div>
                  {user.nickname !== "" && (
                    <div className="detail-row">
                      <PersonInfoIcon />
                      <span>
                        Tên hiển thị là <b>{user.nickname}</b>
                      </span>
                    </div>
                  )}
                  <div className="detail-row">
                    <PersonIcon />
                    <span>
                      Giới tính <b>{user.gender === "male" ? "Nữ" : "Nam"}</b>
                    </span>
                  </div>
                  <div className="detail-row">
                    <CalendarIcon />
                    <span>
                      Sinh ngày <b>{user.dob.substring(0, 10)}</b>
                    </span>
                  </div>
                  <div className="detail-row">
                    <BriefcaseIcon />
                    <span>
                      Học tại khoa <b>{user.faculty}</b>
                    </span>
                  </div>
                  {/* <div className="detail-row">
                    <BriefcaseIcon />
                    <span>
                      Học tại lớp <b>181103B</b>
                    </span>
                  </div> */}
                  {/* <div className="detail-row">
                    <SymbolIcon />
                    <span>
                      Mã số sinh viên là <b>18110381</b>
                    </span>
                  </div> */}
                </div>
                <div className="bookcase-section section">
                  {user.favoriteTags?.length > 0 && (
                    <div className="tag-favorites">
                      <p className="title">YÊU THÍCH</p>
                      <div className="bee-scroll">
                        <div className="tags">
                          {user.favoriteTags?.map((item, index) => (
                            <span className="tag" key={item._id}>
                              #{item.name.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bookcase">
                    <p className="title">
                      TỦ SÁCH CÁ NHÂN{" "}
                      <small>({user.listBooks?.length} Quyển Sách)</small>
                    </p>
                    <div className="bee-scroll">
                      <div className="books">
                        {user.listBooks?.map((item, index) => (
                          <div
                            className="book"
                            key={item._id}
                            style={{
                              backgroundImage: `url("${item.image}")`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="pomodoro-section section"></div> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bee-card-footer">
        <div className="actions">
          <button className="bee-btn yellow" onClick={() => setShowModal(true)}>
            <PersonModifyIcon />
            CHỈNH SỬA
          </button>
          {user.is_banned === 0 ? (
            <button
              className="bee-btn red"
              onClick={() => handleBanUser(user._id, 1, user.name)}
            >
              <LockIcon />
              KHÓA
            </button>
          ) : (
            <button
              className="bee-btn blue"
              onClick={() => handleBanUser(user._id, 0, user.name)}
            >
              <UnlockIcon />
              MỞ KHÓA
            </button>
          )}
        </div>
      </div>
      <UserModifyModal show={showModal} user={user} setShow={setShowModal} handleModifyUser={handleModifyUser}/>
    </div>
  );
}

export default UserDetail;
