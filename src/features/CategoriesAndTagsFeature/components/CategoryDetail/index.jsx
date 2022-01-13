import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import adminAPI from "../../../../api/adminAPI";
import { filesService } from "../../../../services/filesService";

CategoryDetail.propTypes = {};

function CategoryDetail(props) {
  const [category, setCategory] = useState({
    _id: "new",
    name: "",
    quote: "",
    thumbnail: "",
    tags: [],
    color: "",
  });
  const [thumbnail, setThumbnail] = useState({ file: undefined, url: "" });
  const { _id, index, handleUpdateCategoriesList } = props;
  const closeRef = useRef();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tagsForCheck, setTagsForCheck] = useState([]);

  const handleNameChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };
  const handleQuoteChange = (e) => {
    setCategory({ ...category, quote: e.target.value });
  };
  const handleThumbnailChange = (e) => {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setThumbnail({ ...thumbnail, url: url, file: file });
    return () => URL.revokeObjectURL(url);
  };
  const handleTagsChange = (index) => {
    let newCheckTags = [...tagsForCheck];
    newCheckTags[index] = !newCheckTags[index];
    setTagsForCheck([...newCheckTags]);
  };
  const handleColorChange = (e) => {
    setCategory({ ...category, color: e.target.value });
  };
  const handleSaveClick = async () => {
    setLoading(true);
    let categorySave = { ...category };
    //NOTE: verify
    if (categorySave.name === "") {
      window.pushToast("info", "Bạn phải hoàn thành trường tên !");
      return;
    }
    if (categorySave.quote === "") {
      window.pushToast(
        "info",
        "Bạn phải hoàn thành trường Câu trích dẫn Quote !"
      );
      return;
    }

    //NOTE: upload Thumbnail
    if (thumbnail.file) {
      const path =
        "/categories/thumbnail/" +
        thumbnail.file.name.split(".").slice(0, -1).join(".") +
        "-ver" +
        Date.now() +
        ".pdf";
      const url = await filesService.uploadTaskPromise(path, thumbnail.file);
      categorySave.thumbnail = url;
    }

    if (categorySave.thumbnail === "") {
      window.pushToast("info", "Bạn phải tải lên ảnh chủ đề để tiếp tục !");
      return;
    }

    //NOTE: get list tags
    let tagsForSave = [];
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      if (tagsForCheck[index]) {
        tagsForSave.push(element._id);
      }
    }
    categorySave.tags = tagsForSave;

    //NOTE: push save
    if (categorySave._id === "new") {
      adminAPI
        .createCategory(categorySave)
        .then((res) => {
          window.pushToast("success", "Lưu các thay đổi thành công!!");
          setLoading(false);
          handleUpdateCategoriesList(res, index);
          closeRef.current.click();
        })
        .catch((err) => {
          window.pushToast("error", "Đã xảy ra lỗi!!");
          setLoading(false);
          console.log({ err });
        });
    } else {
      adminAPI
        .editCategory(categorySave)
        .then((res) => {
          window.pushToast("success", "Lưu các thay đổi thành công!!");
          setLoading(false);
          handleUpdateCategoriesList(res, index);
          closeRef.current.click();
        })
        .catch((err) => {
          window.pushToast("error", "Đã xảy ra lỗi!!");
          setLoading(false);
          console.log({ err });
        });
    }
  };

  const fetchCategory = async (_id) => {
    adminAPI
      .getCategoryDetail(_id)
      .then((res) => {
        setCategory(res);
        setThumbnail({ ...thumbnail, file: undefined, url: res.thumbnail });
      })
      .catch((err) => {
        console.log({ err });
      });
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
  useEffect(() => {
    fetchAllTags();
  }, []);
  useEffect(() => {
    if (_id !== "new") {
      fetchCategory(_id);
    } else {
      setCategory({
        _id: "new",
        name: "",
        quote: "",
        thumbnail: "",
        tags: [],
        color: "",
      });
      setThumbnail({ file: undefined, url: "" });
    }
  }, [_id]);
  useEffect(() => {
    let newCheckTags = [];
    tags.forEach((element) => {
      if (category.tags.filter((item) => item._id === element._id).length > 0) {
        newCheckTags.push(true);
      } else {
        newCheckTags.push(false);
      }
    });
    setTagsForCheck([...newCheckTags]);
    console.log({ newCheckTags });
  }, [tags, category.tags]);
  return (
    <div className="modal fade" id="modal-category">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            {_id === "new" ? (
              <h4 className="modal-title">THÊM DANH MỤC</h4>
            ) : (
              <h4 className="modal-title">
                {"SỬA ĐỔI DANH MỤC "}{" "}
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
              <div className="col-6">
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>#Tên</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Tên Danh mục"
                        value={category?.name}
                        maxLength={20}
                        onChange={handleNameChange}
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
                        value={category?.quote}
                      ></textarea>
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
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>Màu chủ đề</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="#hex"
                        value={category?.color}
                        maxLength={20}
                        onChange={handleColorChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">Ảnh chủ đề</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            className="custom-file-input"
                            id="exampleInputFile"
                            onChange={handleThumbnailChange}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            {thumbnail.file
                              ? thumbnail.file.name
                              : "Duyệt hoặc kéo thả"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {thumbnail.url !== "" && (
                      <img
                        class="mx-auto d-block"
                        style={{ maxWidth: "400px" }}
                        src={thumbnail.url}
                        alt=""
                      />
                    )}
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

export default CategoryDetail;
