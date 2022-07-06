import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListBooks from "./ListBooks";
import adminAPI from "../../../api/adminAPI";
import BookDetail from "./BookDetail";

BookList.propTypes = {};

function BookList(props) {
  const [book, setBook] = React.useState({
    _id: "new",
    name: "",
    author: "",
    tags: [],
    description: "",
    image: "",
    quote: "",
    price: "",
    link: "",
    linkIntro: "",
    key: "",
    totalPages: 0,
  });
  const [books, setBooks] = React.useState([]);
  const [booksPending, setBooksPending] = React.useState(false);
  const [bookPending, setBookPending] = React.useState(false);
  const [showBookDetail, setShowBookDetail] = React.useState(false);
  function handleViewBookDetail(_id) {
    if (_id !== book._id) fetchBook(_id);
    setShowBookDetail(true);
  }
  const fetchBooks = async () => {
    setBooksPending(true);
    await adminAPI
      .getAllBook()
      .then((res) => {
        setBooks(res);
        setBooksPending(false);
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
        setBooksPending(false);
      });
  };
  const fetchBook = async (_id) => {
    setBookPending(true);
    adminAPI
      .getBookDetail(_id)
      .then((res) => {
        setBook({ ...res });
        setBookPending(false);
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
        setBookPending(false);
      });
  };
  React.useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="book-list-container row">
      <ListBooks
        books={books}
        pending={booksPending}
        handleViewBookDetail={handleViewBookDetail}
      />
      <BookDetail
        show={showBookDetail}
        book={book}
        pending={bookPending}
        handleHide={() => setShowBookDetail(false)}
      />
    </div>
  );
}

export default BookList;
