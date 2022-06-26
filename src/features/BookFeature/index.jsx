import React from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Report from "./components/Report";
import BooksList from "./components/BooksList";

BookFeature.propTypes = {};

function BookFeature(props) {
  return (
    <div className="content">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Quản lí sách</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <Header />
          <Report />
          <BooksList />
        </div>
      </section>
    </div>
  );
}

export default BookFeature;
