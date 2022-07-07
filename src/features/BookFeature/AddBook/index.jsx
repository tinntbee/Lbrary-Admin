import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import AddOneBook from "./AddOneBook";
import AddMultiBook from "./AddMultiBook";

AddBook.propTypes = {};

function AddBook(props) {
  const [tab, setTab] = React.useState(1);
  return (
    <div className="add-book-container">
      <div className="tabs-bar">
        <ul>
          <li className={tab === 0 ? "active" : ""} onClick={() => setTab(0)}>
            Thêm Sách
          </li>
          <li className={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>
            Nhập danh sách Sách
          </li>
        </ul>
      </div>
      <div className="tab-content" style={{ "--tab": tab }}>
        <div className="tab">
          <AddOneBook className={tab === 0 ? "active" : ""} />
        </div>
        <div className="tab">
          <AddMultiBook className={tab === 1 ? "active" : ""} />
        </div>
      </div>
    </div>
  );
}

export default AddBook;
