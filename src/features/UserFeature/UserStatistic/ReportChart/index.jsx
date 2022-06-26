import React from "react";
import PropTypes from "prop-types";
import UserByFaculty from "./UserByFaculty/UserByFaculty";
import UserByMonth from "./UserByMonth/UserByMonth";
import "./style.scss";

function ReportChart(props) {
  return (
    <div className="report-chart-container">
      <div className="user-by-faculty">
        <UserByFaculty />
      </div>
      <div className="user-by-month">
          <UserByMonth />
      </div>
    </div>
  );
}

export default ReportChart;
