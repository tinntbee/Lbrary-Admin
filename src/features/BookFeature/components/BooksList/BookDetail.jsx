import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

BookDetail.propTypes = {
  _id: PropTypes.string,
};

function BookDetail(props) {
  const { _id } = props;
  return (
    <div className="modal fade" id="modal-book">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            {_id === "new" ? (
              <h4 className="modal-title">THÊM SÁCH</h4>
            ) : (
              <h4 className="modal-title">
                {"SỬA ĐỔI SÁCH "} <small><i>{" _id: " + _id}</i></small>
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
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>Thẻ #Tags</label>
                      <div className="select2-success">
                        <select
                          className="select2 form-control"
                          multiple="multiple"
                          data-placeholder="Select a State"
                          data-dropdown-css-class="select2-success"
                          style={{ width: "100%" }}
                        >
                          <option>Alabama</option>
                          <option>Alaska</option>
                          <option>California</option>
                          <option>Delaware</option>
                          <option>Tennessee</option>
                          <option>Texas</option>
                          <option>Washington</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div class="form-group">
                      <label>Tác giả</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nhập vào tên tác giả"
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
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div class="form-group">
                      <label>Thông tin chi tiết</label>
                      <textarea rows="3" id="summernote">
                        Chi tiết
                      </textarea>
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
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">File Sách (PDF)</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            accept="application/pdf"
                            className="custom-file-input"
                            id="exampleInputFile"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="exampleInputFile"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputFile">Ảnh bìa Sách</label>
                      <div className="image-book-input">
                        <input type="file" />
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
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
