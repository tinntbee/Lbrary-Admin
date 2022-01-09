import React from "react";
import PropTypes from "prop-types";
import TopBook from "./TopBook";
import BooksByTags from "./BooksByTags";
import BooksChart from "./BooksChart";

Report.propTypes = {};

function Report(props) {
  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h4 className="m-0">Thống kê & Báo cáo</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-lg-3 col-4">
          <TopBook />
        </div>
        <div class="col-lg-3 col-4">
          <BooksByTags />
        </div>
        <div class="col-lg-6 col-4">
          <BooksChart />
        </div>
      </div>
    </>
  );
}

export default Report;
