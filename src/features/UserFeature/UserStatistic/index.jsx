import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ReportChart from "./ReportChart";
import "./style.scss"

UserStatistic.propTypes = {};

function UserStatistic(props) {
  return (
    <div className="content">
      <Header />
      <ReportChart />
    </div>
  );
}

export default UserStatistic;
