import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "../../../../components/Icon/CloseIcon";
import "./style.scss";
import FlowerIcon from "../../../../components/Icon/FlowerIcon";
import CartIcon from "../../../../components/Icon/CartIcon";
import ThumbUpIcon from "../../../../components/Icon/ThumbUpIcon";
import CommentIcon from "../../../../components/Icon/CommentIcon";
import CommentItem from "../../../../components/CommentItem";
import BookIcon from "../../../../components/Icon/BookIcon";
import LockIcon from "../../../../components/Icon/LockIcon";
import UnlockIcon from "../../../../components/Icon/UnlockIcon";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";

BookDetail.propTypes = {};

function BookDetail(props) {
  const { handleHide, handleBanBook, show, book, pending } = props;
  return (
    <div
      className={
        show
          ? "bee-card book-detail-container"
          : "bee-card book-detail-container hidden"
      }
    >
      <div className="bee-card-header">
        <h3 className="bee-card-title">THÔNG TIN SÁCH</h3>
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
          <div className="col book-information">
            <div className="intro-section section">
              <div
                className="thumbnail"
                style={{
                  backgroundImage: `url("${book.image}")`,
                }}
              >
                {book.is_active === 1 ? (
                  ""
                ) : (
                  <div className="lock">
                    <LockIcon />
                  </div>
                )}
              </div>
              <div className="col intro">
                <p className="name">{book.name}</p>
                <p className="author">{book.author ? book.author : "noname"}</p>
                <div className="rates row">
                  <div className="col txt-yellow">
                    <FlowerIcon />
                    {book.price}
                  </div>
                  <div className="col">
                    <CartIcon />
                    {book.totalRead}
                  </div>
                  <div className="col">
                    <ThumbUpIcon />
                    {`${
                      book.totalDislike + book.totalLike === 0
                        ? "0"
                        : Math.round(
                            (book.totalLike * 100) /
                              (book.totalDislike + book.totalLike)
                          )
                    }% | ${book.totalDislike + book.totalLike}`}
                  </div>
                  <div className="col">
                    <CommentIcon />
                    {book.totalComments}
                  </div>
                </div>
                <div className="tags bee-scroll">
                  {book.tags.map((item, index) => (
                    <div className="tag">#{item.name}</div>
                  ))}
                </div>
                <div className="views row">
                  {book.linkIntro && (
                    <button className="bee-btn blue">XEM INTRO</button>
                  )}
                  {book.link && (
                    <button className="bee-btn yellow">XEM SÁCH</button>
                  )}
                </div>
              </div>
            </div>
            <div className="bee-scroll">
              <div className="comments-section col">
                {book.listComments?.map((item, index) => (
                  <CommentItem comment={item} key={item._id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bee-card-footer">
        <div className="actions">
          <button className="bee-btn yellow" onClick={() => {}}>
            <BookIcon />
            CHỈNH SỬA
          </button>
          {book.is_active === 1 ? (
            <button
              className="bee-btn red"
              onClick={() => handleBanBook(book._id, 1, book.name)}
            >
              <LockIcon />
              KHÓA
            </button>
          ) : (
            <button
              className="bee-btn blue"
              onClick={() => handleBanBook(book._id, 0, book.name)}
            >
              <UnlockIcon />
              MỞ KHÓA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
