import React from "react";
import PropTypes from "prop-types";

TopBook.propTypes = {};

function TopBook(props) {
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
            <tr>
              <td>Some Product</td>
              <td>45</td>
              <td>45</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>Some Product</td>
              <td>45</td>
              <td>45</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>Some Product</td>
              <td>45</td>
              <td>45</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>Some Product</td>
              <td>45</td>
              <td>45</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>Some Product</td>
              <td>45</td>
              <td>45</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>Some Product</td>
              <td>45</td>
              <td>45</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>Some Product</td>
              <td>45</td>
              <td>45</td>
              <td>78%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopBook;
