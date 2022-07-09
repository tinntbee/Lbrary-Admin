import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListBooks from "./ListBooks";
import adminAPI from "../../../api/adminAPI";
import BookDetail from "./BookDetail";
import BookModifyPopup from "./BookModifyPopup";
import { useSnackbar } from "notistack";
import sleep from "../../../utils/sleep";

BookList.propTypes = {};

function BookList(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
  const [showBookModifyPopup, setShowBookModifyPopup] = React.useState(false);
  const [bookModifyPopPending, setBookModifyPopupPending] =
    React.useState(false);
  function handleViewBookDetail(_id) {
    if (_id !== book._id) fetchBook(_id);
    setShowBookDetail(true);
  }
  function handleViewBookModify(book) {
    setShowBookModifyPopup(true);
  }
  function handleModifyBook(book, pdfFile, thumbnailFile) {
    setBookModifyPopupPending(true);
    var formData = new FormData();
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }
    formData.append("detail", JSON.stringify(book));
    adminAPI
      .putBook(formData)
      .then((res) => {
        if (res) {
          let newBooks = [...books];
          const index = newBooks.findIndex((b) => b._id === res._id);
          if (index > -1) {
            newBooks[index] = res;
            setShowBookModifyPopup(false);
            setBooks([...newBooks]);
            setBookModifyPopupPending(false);
            setBook(res);
          }
          enqueueSnackbar(`Lưu các thay đổi thành công!`, {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        setBookModifyPopupPending(false);
        switch (err.response.status) {
          case 405:
            enqueueSnackbar(`Mô tả sách không được bỏ trống!`, {
              variant: "error",
            });
            return;
          case 406:
            enqueueSnackbar(`Tên Sách đã tồn tại!`, {
              variant: "error",
            });
            return;
          case 407:
            enqueueSnackbar(`Khởi tạo Ảnh bìa thất bại!`, {
              variant: "error",
            });
            return;
          case 408:
            enqueueSnackbar(`Khởi tạo Intro thất bại!`, {
              variant: "error",
            });
            return;
          case 409:
            enqueueSnackbar(`Mã hóa Sách thất bại!`, {
              variant: "error",
            });
            return;
          case 410:
            enqueueSnackbar(`Không nhận được file Sách!`, {
              variant: "error",
            });
            return;
          default:
            enqueueSnackbar(`Lỗi Server!`, {
              variant: "error",
            });
            return;
        }
      });
    setBookModifyPopupPending(false);
  }
  function handleBanBook(_id, is_active, name) {
    adminAPI
      .banBook({ _id, is_active })
      .then((res) => {
        let newBooks = [...books];
        setBook({ ...book, is_active: res.is_active });
        newBooks.find((b) => b._id === _id).is_active = res.is_active;
        setBooks([...newBooks]);
        if (is_active === 0) {
          enqueueSnackbar(`Đã khóa: "${name}"!`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Đã mở khóa: "${name}"!`, {
            variant: "success",
          });
        }
      })
      .catch((e) => {
        enqueueSnackbar(`Thao tác thất bại!`, {
          variant: "error",
        });
      });
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
  function handleBanComment(_id, status) {
    adminAPI
      .banCommentOrReply({ _id, status })
      .then((res) => {
        let newBook = { ...book };
        newBook.listComments.find((c) => c._id === _id).status = res.status;
        setBook({ ...newBook });
        if (status === 0) {
          enqueueSnackbar(`Đã khóa!`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Đã mở khóa!`, {
            variant: "success",
          });
        }
      })
      .catch((e) => {
        enqueueSnackbar(`Thao tác thất bại!`, {
          variant: "error",
        });
      });
  }
  React.useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="book-list-container row">
      <ListBooks
        books={books}
        pending={booksPending}
        handleViewBookDetail={handleViewBookDetail}
        handleBanBook={handleBanBook}
      />
      <BookDetail
        show={showBookDetail}
        book={book}
        pending={bookPending}
        handleHide={() => setShowBookDetail(false)}
        handleViewBookModify={handleViewBookModify}
        handleBanBook={handleBanBook}
        handleBanComment={handleBanComment}
      />
      <BookModifyPopup
        book={book}
        show={showBookModifyPopup}
        setShow={setShowBookModifyPopup}
        pending={bookModifyPopPending}
        setPending={setBookModifyPopupPending}
        handleModify={handleModifyBook}
      />
    </div>
  );
}

export default BookList;
