import React, { useState } from "react";
import PropTypes from "prop-types";
import BookDetail from "./BookDetail";

BooksList.propTypes = {};

function BooksList(props) {
  const [_idCurrent, set_idCurrent] = useState("new");
  const handleRemoveClick = ({ _id, name }) => {
    if (window.confirm("Bạn xuống xóa " + name + " ??")) {
      alert("Đã xóa");
    }
  };
  const handleModifyClick = (_id) => {
    set_idCurrent(_id);
  };
  const handleCreateNewClick = () => {
    set_idCurrent("new");
  };
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
                  <tr>
                    <td>Vũ trụ trong vỏ hạt dẻ</td>
                    <td>
                      <span class="badge bg-success">#Khoa học</span>{" "}
                      <span class="badge bg-success">#Vật lí</span>
                    </td>
                    <td>$43</td>
                    <td>
                      <span class="badge bg-danger">
                        <i className="fas fa-shopping-cart"></i> 39
                      </span>
                    </td>
                    <td>
                      <span class="badge bg-success">
                        <i className="fas fa-thumbs-up"></i> 70%
                      </span>
                    </td>
                    <td>
                      <span class="badge bg-info">
                        <i className="fas fa-comments"></i> 45
                      </span>
                    </td>
                    <td>
                      <span class="badge bg-warning">
                        <i className="fas fa-lock"></i> Khóa
                      </span>
                    </td>
                    <td>
                      <span>
                        <button
                          type="button"
                          class="mr-2 btn btn-info btn-sm"
                          data-toggle="modal"
                          data-target="#modal-book"
                          onClick={() => {
                            handleModifyClick("kdufgbdsdfs");
                          }}
                        >
                          <i className="fas fa-pen-alt"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          onClick={() => {
                            handleRemoveClick({
                              _id: "dfhgfdg",
                              name: "demo ",
                            });
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </span>
                    </td>
                  </tr>
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
      <BookDetail _id={_idCurrent} />
    </>
  );
}

export default BooksList;
