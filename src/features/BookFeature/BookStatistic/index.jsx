import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ReportChart from "./ReportChart";

BookStatistic.propTypes = {};

function BookStatistic(props) {
  return (
    <div className="content">
      <Header />
      <ReportChart />
    </div>
  );
}

export default BookStatistic;
