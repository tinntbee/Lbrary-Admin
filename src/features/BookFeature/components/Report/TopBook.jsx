import React from "react";
import PropTypes from "prop-types";
import adminAPI from "../../../../api/adminAPI";
import { useEffect } from "react";
import { useState } from "react";

TopBook.propTypes = {};

function TopBook(props) {
  // avgReact: 0.5
  // name: "Toán học và Bóng đá"
  // totalPoint: 24
  // totalReach: 4
  // totalReact: 2
  // totalRead: 18
  const [data, setData] = useState([]);
  const fetchData = async () => {
    adminAPI
      .topBooks()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="card card-info">
      <div className="card-header border-0">
        <h2 className="card-title">Top Books</h2>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus" />
          </button>
        </div>
      </div>
      <div className="card-body table-responsive p-0">
        <table className="table table-striped table-valign-middle">
          <thead>
            <tr>
              <th>Tên</th>
              <th>
                <i className="fas fa-shopping-cart" />
              </th>
              <th>
                <i className="fas fa-comments" />
              </th>
              <th>
                <i className="fas fa-thumbs-up" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.totalRead}</td>
                    <td>{item.totalReach}</td>
                    <td>{item.avgReact + "/" + item.totalReact}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopBook;
