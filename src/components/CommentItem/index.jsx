import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ThumbUpIcon from "../Icon/ThumbUpIcon";
import ThumbDownIcon from "../Icon/ThumbDownIcon";

CommentItem.propTypes = {};

function CommentItem(props) {
  const { comment } = props;
  console.log({ comment });
  return (
    <div
      className={
        comment.status === 0
          ? "comment-item section col hidden"
          : "comment-item section col"
      }
    >
      <div className="header row">
        <div
          className="avatar-section"
          style={{ backgroundImage: `url("${comment.user.avatar}")` }}
        />
        <div className="user-info-section col">
          <p className="name">
            {comment.user.nickname ? comment.user.nickname : comment.user.name}
          </p>
          <p className="email">{comment.user.email}</p>
        </div>
        {comment.type && comment.type !== 0 ? (
          <div
            className={
              comment.type === 1
                ? "react-section like"
                : "react-section dislike"
            }
          >
            {comment.type === 1 ? <ThumbUpIcon /> : <ThumbDownIcon />}
          </div>
        ) : ""}
      </div>
      <div className="content">{comment.content}</div>
      {comment.status === 0 ? (
        <button className="bee-btn blue">Hiện Bình Luận</button>
      ) : (
        <button className="bee-btn red">Ẩn Bình Luận</button>
      )}
    </div>
  );
}

export default CommentItem;
