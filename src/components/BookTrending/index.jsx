import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import CartIcon from "../Icon/CartIcon";
import ThumbUpIcon from "../Icon/ThumbUpIcon";
import CommentIcon from "../Icon/CommentIcon";

BookTrending.propTypes = {};
BookTrending.defaultProps = {
  book: {
    _id: "",
    name: "A LOVE HATE THING",
    author: "Whitney D. Grandison",
    totalRead: 502,
    avgReact: 89,
    totalReact: 11,
    totalReach: 302,
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1560794474l/44674899.jpg",
  },
};

function BookTrending(props) {
  const { book } = props;
  return (
    <div className="book-trending row bg-green-50">
      <div
        className="image-section"
        style={{ backgroundImage: `url("${book.image}")` }}
      />
      <div className="detail-section">
        <p className="name">{book.name}</p>
        <p className="author">{book.author ? book.author : "noname"}</p>
        <div className="row rates">
          <div className="col">
            <CartIcon />
            <p className="value">{book.totalRead}</p>
          </div>
          <div className="col">
            <ThumbUpIcon />
            {/* <p className="value">{`${
              book.totalDisLike + book.totalLike === 0
                ? "-"
                : Math.round(
                    (book.totalLike * 100) /
                      (book.totalDisLike + book.totalLike)
                  )
            }% | ${book.totalDisLike + book.totalLike}`}</p> */}
            <p className="value">{`${book.avgReact}% | ${book.totalReact}`}</p>
          </div>
          <div className="col">
            <CommentIcon />
            <p className="value">{book.totalReach}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTrending;
