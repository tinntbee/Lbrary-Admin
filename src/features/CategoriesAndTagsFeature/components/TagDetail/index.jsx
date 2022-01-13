import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import adminAPI from "../../../../api/adminAPI";

TagDetail.propTypes = {};

function TagDetail(props) {
  const [tag, setTag] = useState({ _id: "new", name: "", description: "" });
  const { _id, index, handleUpdateTagsList } = props;
  const closeRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    if (e.target.value !== "") {
      setTag({ ...tag, name: e.target.value.toUpperCase() });
    } else {
      setTag({ ...tag, name: e.target.value });
    }
  };
  const handleDescriptionChange = (e) => {
    setTag({ ...tag, description: e.target.value });
  };
  const handleSaveClick = () => {
    setLoading(true);
    if (_id === "new") {
      adminAPI
        .createTag(tag)
        .then((res) => {
          window.pushToast("success", "Lưu các thay đổi thành công!!");
          setLoading(false);
          handleUpdateTagsList(res, index);
          closeRef.current.click();
        })
        .catch((err) => {
          window.pushToast("error", "Đã xảy ra lỗi!!");
          setLoading(false);
          console.log({ err });
        });
    } else {
      adminAPI
        .editTag(tag)
        .then((res) => {
          window.pushToast("success", "Lưu các thay đổi thành công!!");
          setLoading(false);
          handleUpdateTagsList(res, index);
          closeRef.current.click();
        })
        .catch((err) => {
          window.pushToast("error", "Đã xảy ra lỗi!!");
          setLoading(false);
          console.log({ err });
        });
    }
  };

  const fetchTag = async (_id) => {
    adminAPI
      .getTagDetail(_id)
      .then((res) => setTag(res))
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    if (_id === "new") {
      setTag({ _id: "new", name: "", description: "" });
    } else {
      fetchTag(_id);
    }
  }, [_id]);
  return (
    <div className="modal fade" id="modal-tag">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {_id === "new" ? (
              <h4 className="modal-title">THÊM THẺ (TAG)</h4>
            ) : (
              <h4 className="modal-title">{"SỬA ĐỔI THẺ (TAGS) "}</h4>
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
              <div className="col-12">
                <div class="form-group">
                  <label>#Tên</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="THE SACH"
                    value={tag?.name}
                    maxLength={20}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div class="form-group">
                  <label>Mô tả</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Enter ..."
                    maxLength={200}
                    onChange={handleDescriptionChange}
                    value={tag?.description}
                  ></textarea>
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

export default TagDetail;
