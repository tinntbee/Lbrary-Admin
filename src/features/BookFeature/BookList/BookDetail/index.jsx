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
import BookViewer from "../BookViewer";

BookDetail.propTypes = {};

function BookDetail(props) {
  const {
    handleHide,
    handleBanBook,
    show,
    book,
    pending,
    handleViewBookModify,
    handleBanComment,
  } = props;

  console.log({ book });
  const [bookViewer, setBookViewer] = React.useState({
    url: "",
    password: "",
  });
  const [showBookViewer, setShowBookViewer] = React.useState(false);
  function handleViewBookIntro() {
    setBookViewer({ url: book.linkIntro, password: "" });
    setShowBookViewer(true);
  }
  function handleViewBook() {
    setShowBookViewer(true);
    setBookViewer({ url: book.link, password: book.key });
  }
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
                <p className="name">
                  <a
                    href={
                      process.env.REACT_APP_CLIENT + `/book-detail/${book._id}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {book.name}
                  </a>
                </p>
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
                    <div key={index} className="tag">
                      #{item.name}
                    </div>
                  ))}
                </div>
                <div className="views row">
                  {book.linkIntro && (
                    <button
                      className="bee-btn blue"
                      onClick={handleViewBookIntro}
                    >
                      XEM INTRO
                    </button>
                  )}
                  {book.link && (
                    <button className="bee-btn yellow" onClick={handleViewBook}>
                      XEM SÁCH
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="bee-scroll">
              <div className="comments-section col">
                {book.listComments?.map((item, index) => (
                  <CommentItem
                    handleBanComment={handleBanComment}
                    comment={item}
                    key={item._id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bee-card-footer">
        <div className="actions">
          <button
            className="bee-btn yellow"
            onClick={() => {
              handleViewBookModify();
            }}
          >
            <BookIcon />
            CHỈNH SỬA
          </button>
          {book.is_active === 1 ? (
            <button
              className="bee-btn red"
              onClick={() => handleBanBook(book._id, 0, book.name)}
            >
              <LockIcon />
              KHÓA
            </button>
          ) : (
            <button
              className="bee-btn blue"
              onClick={() => handleBanBook(book._id, 1, book.name)}
            >
              <UnlockIcon />
              MỞ KHÓA
            </button>
          )}
        </div>
      </div>
      <BookViewer
        pdf={bookViewer}
        show={showBookViewer}
        setShow={setShowBookViewer}
      />
    </div>
  );
}

export default BookDetail;
