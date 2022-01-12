import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import adminAPI from "../../../../api/adminAPI";
import FroalaEditor from "react-froala-wysiwyg";

// Require Editor JS files.
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/froala_editor.pkgd.min.js";
// import "froala-editor/js/plugins/fullscreen.min.js"

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
import { filesService } from "../../../../services/filesService";

BookDetail.propTypes = {
  _id: PropTypes.string,
};

function BookDetail(props) {
  const closeRef = useRef();
  const [loading, setLoading] = useState(false);
  const { _id, index, handleUpdateBooksList } = props;
  const [book, setBook] = useState({
    _id: "new",
    name: "",
    authors: "",
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
  const [image, setImage] = useState({ file: undefined, url: "" });
  const [fileBook, setFileBook] = useState();
  const [fileIntro, setFileIntro] = useState();
  const [tags, setTags] = useState([]);
  const [tagsForCheck, setTagsForCheck] = useState([]);

  const handleTagsChange = (index) => {
    let newCheckTags = [...tagsForCheck];
    newCheckTags[index] = !newCheckTags[index];
    setTagsForCheck([...newCheckTags]);
  };
  const handleNameChange = (e) => {
    setBook({ ...book, name: e.target.value });
  };
  const handleAuthorChange = (e) => {
    setBook({ ...book, authors: e.target.value });
  };
  const handlePriceChange = (e) => {
    if (e.target.value >= 0) {
      setBook({ ...book, price: e.target.value });
    } else {
      setBook({ ...book, price: 0 });
    }
  };
  const handleDescriptionChange = (model) => {
    setBook({ ...book, description: model });
  };
  const handleQuoteChange = (e) => {
    setBook({ ...book, quote: e.target.value });
  };
  const handleTotalPagesChange = (e) => {
    setBook({ ...book, totalPages: e.target.value });
  };
  const handleKeyChange = (e) => {
    setBook({ ...book, key: e.target.value });
  };
  const handleImageChange = (e) => {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setImage({ ...image, url: url, file: file });
    return () => URL.revokeObjectURL(url);
  };
  const hanldeFileBookChange = (e) => {
    var file = e.target.files[0];
    setFileBook(file);
  };
  const hanldeFileIntroChange = (e) => {
    var file = e.target.files[0];
    setFileIntro(file);
  };
  const handleSaveClick = async () => {
    // window.pushToast("success", "hello");
    setLoading(true);
    let bookSave = { ...book };
    if (!bookSave.link && !fileBook) {
      window.pushToast(
        "info",
        "Bạn phải tải lên file Sách định dạng PDF để tiếp tục !"
      );
      setLoading(false);
      return;
    }

    //NOTE: upload file
    if (fileBook) {
      const path =
        "/books/pdf/" +
        fileBook.name.split(".").slice(0, -1).join(".") +
        "-ver" +
        Date.now() +
        ".pdf";
      const url = await filesService.uploadTaskPromise(path, fileBook);
      bookSave.link = url;
    }
    //NOTE: upload intro
    if (fileIntro) {
      const path =
        "/books/intro/" +
        fileIntro.name.split(".").slice(0, -1).join(".") +
        "-ver" +
        Date.now() +
        ".pdf";
      const url = await filesService.uploadTaskPromise(path, fileIntro);
      bookSave.linkIntro = url;
    }

    //NOTE: upload image
    if (image.file) {
      const path =
        "/books/images/" +
        image.file.name.split(".").slice(0, -1).join(".") +
        "-ver" +
        Date.now();
      const url = await filesService.uploadTaskPromise(path, image.file);
      bookSave.image = url;
    }

    //NOTE: get tags
    let tagsForBookSave = [];
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      if (tagsForCheck[index]) {
        tagsForBookSave.push(element._id);
      }
    }
    bookSave.tags = tagsForBookSave;
    console.log({ bookSave });
    adminAPI
      .putBook(bookSave)
      .then((res) => {
        window.pushToast("success", "Lưu các thay đổi thành công!!");
        setLoading(false);
        handleUpdateBooksList(res, index);
        closeRef.current.click();
      })
      .catch((err) => {
        window.pushToast("error", "Có lỗi sảy ra :((");
        console.log({ err });
        setLoading(false);
      });
    // closeRef.current.click();
  };

  const fetchAllTags = async () => {
    adminAPI
      .getAllTags()
      .then((res) => {
        setTags(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const fetchBook = async (_id) => {
    setLoading(true);
    adminAPI
      .getBookDetail(_id)
      .then((res) => {
        setBook({ ...book, ...res });
        setImage({ ...image, url: res.image });
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllTags();
  }, []);
  useEffect(() => {
    if (_id != "new") {
      fetchBook(_id);
    } else {
      setBook({
        _id: "new",
        name: "",
        authors: "",
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
      setImage({ file: undefined, url: "" });
    }
    setFileBook();
    setFileIntro();
  }, [_id]);
  useEffect(() => {
    let newCheckTags = [];
    console.log({ book });
    tags.forEach((element) => {
      if (book.tags.filter((item) => item._id === element._id).length > 0) {
        newCheckTags.push(true);
      } else {
        newCheckTags.push(false);
      }
    });
    setTagsForCheck([...newCheckTags]);
    console.log({ newCheckTags });
  }, [tags, book.tags]);
  return (
    <div className="modal fade" id="modal-book">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            {_id === "new" ? (
              <h4 className="modal-title">THÊM SÁCH</h4>
            ) : (
              <h4 className="modal-title">
                {"SỬA ĐỔI SÁCH "}{" "}
                <small>
                  <i>{" _id: " + _id}</i>
                </small>
              </h4>
            )}
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>Tên sách</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập vào tên sách"
                        value={book?.name}
                        onChange={handleNameChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>Thẻ (tags)</label>
                      <br />
                      <h5>
                        {tags &&
                          tags.map((item, index) => {
                            return (
                              tagsForCheck[index] && (
                                <span
                                  class="badge bg-orange m-1"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleTagsChange(index)}
                                >
                                  {"#" + item.name}
                                </span>
                              )
                            );
                          })}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="row tags-list">
                  {tags &&
                    tags.map((item, index) => {
                      return (
                        <div className="col-4">
                          <div className="form-group clearfix">
                            <div className="icheck-orange d-inline">
                              <input
                                type="checkbox"
                                id={item._id}
                                checked={tagsForCheck[index]}
                                onChange={() => handleTagsChange(index)}
                              />
                              <label htmlFor={item._id}>{item.name}</label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="row">
                  <div className="col-6">
                    <div class="form-group">
                      <label>Tác giả</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập vào tên tác giả"
                        value={book?.authors}
                        onChange={handleAuthorChange}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="form-group">
                      <label>Giá</label>
                      <input
                        type="number"
                        min={0}
                        max={999}
                        class="form-control"
                        placeholder="Nhập vào tên tác giả"
                        value={book?.price}
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>Thông tin chi tiết</label>
                      <FroalaEditor
                        className="ReadingSpace__editor"
                        tag="textarea"
                        model={book.description}
                        onModelChange={handleDescriptionChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>Quote</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        placeholder="Enter ..."
                        maxLength={200}
                        onChange={handleQuoteChange}
                        value={book?.quote}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">
                        File Intro Sách (PDF){" "}
                        {book.linkIntro && (
                          <small
                            style={{ marginRight: "0", cursor: "pointer" }}
                          >
                            <a href={book.linkIntro} target="_blank">
                              Intro hiện tại
                            </a>
                          </small>
                        )}
                      </label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            accept="application/pdf"
                            className="custom-file-input"
                            id="exampleInputFile"
                            onChange={hanldeFileIntroChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            {fileIntro ? fileIntro.name : "Duyệt hoặc kéo thả"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">
                        File Sách (PDF){" "}
                        {book.link && (
                          <small
                            style={{ marginRight: "0", cursor: "pointer" }}
                          >
                            <a href={book.link} target="_blank">
                              Sách hiện tại
                            </a>
                          </small>
                        )}
                      </label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            accept="application/pdf"
                            className="custom-file-input"
                            id="exampleInputFile"
                            onChange={hanldeFileBookChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            {fileBook ? fileBook.name : "Duyệt hoặc kéo thả"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div class="form-group">
                      <label>Mật khẩu (nếu có)</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Mật khẩu"
                        value={book?.key}
                        onChange={handleKeyChange}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-group">
                      <label>Số trang</label>
                      <input
                        type="number"
                        min="0"
                        defaultValue={0}
                        class="form-control"
                        placeholder="Số trang"
                        value={book?.totalPages}
                        onChange={handleTotalPagesChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">Ảnh bìa Sách</label>
                      <div
                        className="image-book-input"
                        style={{ backgroundImage: `url("${image.url}")` }}
                      >
                        <input type="file" onChange={handleImageChange} />
                        <p>Kéo thả ảnh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              ref={closeRef}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveClick}
              disabled={loading}
            >
              {loading && (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                </>
              )}
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
