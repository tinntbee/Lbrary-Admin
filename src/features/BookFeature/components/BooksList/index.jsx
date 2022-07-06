import React, { useState } from "react";
import PropTypes from "prop-types";
import BookDetail from "./BookDetail";
import { useEffect } from "react";
import adminAPI from "../../../../api/adminAPI";

BooksList.propTypes = {};

function BooksList(props) {
  const [books, setBooks] = useState([]);
  const [version, setVersion] = useState(0);
  const [bookCurrent, setBookCurrent] = useState({ _id: "new", index: -1 });
  const handleRemoveClick = ({ _id, name }) => {
    if (window.confirm("Bạn xuống xóa " + name + " ??")) {
      setBooks([...books].filter((item) => item._id != _id));
    }
  };
  const handleModifyClick = (_id, index) => {
    setBookCurrent({ _id, index });
  };
  const handleCreateNewClick = () => {
    setBookCurrent({ _id: "new", index: -1 });
  };
  const handleLockBookClick = (_id) => {
    adminAPI.banBook({ _id, is_active: 0 }).then((res) => {
      let newBooks = [...books];
      newBooks.filter((item) => item._id === _id)[0].is_active = res.is_active;
      setBooks([...newBooks]);
    });
  };
  const handleOpenBookClick = (_id) => {
    adminAPI.banBook({ _id, is_active: 1 }).then((res) => {
      let newBooks = [...books];
      newBooks.filter((item) => item._id === _id)[0].is_active = res.is_active;
      setBooks([...newBooks]);
    });
  };
  const handleUpdateBooksList = (book, index) => {
    if (index > -1) {
      let newBooks = [...books];
      newBooks[index].name = book.name;
      newBooks[index].price = book.price;
      newBooks[index].tags = book.tags;
      setBooks([...newBooks]);
    } else {
      let newBooks = [...books];
      newBooks.unshift(book);
      setBooks([...newBooks]);
    }
  };

  const fetchBooks = async () => {
    await adminAPI
      .getAllBook()
      .then((res) => {
        setBooks(res);
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  // useEffect(() => {
  //   if (books.length > 0) {
  //     window.rawTable();
  //   }
  // }, [books]);
  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h4 className="m-0">Danh sách</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div class="card card-warning card-outline">
            <div class="card-header">
              <h3 class="card-title">Sách</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool btn-success"
                  data-toggle="modal"
                  data-target="#modal-book"
                  onClick={handleCreateNewClick}
                >
                  <i className="fas fa-plus" /> Thêm sách
                </button>
              </div>
            </div>

            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Thẻ</th>
                    <th>Giá</th>
                    <th>lượt mua</th>
                    <th>Đánh giá</th>
                    <th>Bình luận</th>
                    <th>Tình trạng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {books &&
                    books.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>
                            {item.tags &&
                              item.tags.map((item, index) => {
                                return (
                                  <>
                                    <span class="badge bg-orange">
                                      {"#" + item.name}
                                    </span>{" "}
                                  </>
                                );
                              })}
                          </td>
                          <td>${item.price}</td>
                          <td>
                            <span class="badge bg-danger">
                              <i className="fas fa-shopping-cart"></i>{" "}
                              {item.totalRead}
                            </span>
                          </td>
                          <td>
                            <span class="badge bg-success">
                              <i className="fas fa-thumbs-up"></i>{" "}
                              {item.totalLike + "   "}
                              <i className="fas fa-thumbs-down"></i>{" "}
                              {item.totalDislike}
                            </span>
                          </td>
                          <td>
                            <span class="badge bg-info">
                              <i className="fas fa-comments"></i>{" "}
                              {item.totalComments}
                            </span>
                          </td>
                          <td>
                            {item.is_active == 1 ? (
                              <span
                                class="badge bg-success"
                                onClick={() => handleLockBookClick(item._id)}
                                style={{ cursor: "pointer" }}
                              >
                                Hoạt động
                              </span>
                            ) : (
                              <span
                                class="badge bg-warning"
                                onClick={() => handleOpenBookClick(item._id)}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fas fa-lock"></i> Khóa
                              </span>
                            )}
                          </td>
                          <td>
                            <span>
                              <button
                                type="button"
                                class="mr-2 btn btn-info btn-sm"
                                data-toggle="modal"
                                data-target="#modal-book"
                                onClick={() => {
                                  handleModifyClick(item._id, index);
                                }}
                              >
                                <i className="fas fa-pen-alt"></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-danger btn-sm"
                                onClick={() => {
                                  handleRemoveClick({
                                    _id: item._id,
                                    name: item.name,
                                  });
                                }}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Tên</th>
                    <th>Thẻ</th>
                    <th>Giá</th>
                    <th>lượt mua</th>
                    <th>Đánh giá</th>
                    <th>Bình luận</th>
                    <th>Tình trạng</th>
                    <th>Hành động</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <BookDetail
        _id={bookCurrent._id}
        index={bookCurrent.index}
        handleUpdateBooksList={handleUpdateBooksList}
      />
    </>
  );
}

export default BooksList;
