import React from "react";
import PropTypes from "prop-types";
import HotTrending from "./HotTrending";
import "./style.scss";
import ReportByTag from "./ReportByTag";
import ReportProfit from "./ReportProfit";

ReportChart.propTypes = {};

function ReportChart(props) {
  return (
    <div className="report-chart-container">
      <div className="hot-trending-section">
        <HotTrending />
      </div>
      <div className="profit-by-tag-section">
        <ReportByTag />
      </div>
      <div className="report-by-tag-section">
        <ReportByTag />
      </div>
      <div className="report-profit-section">
        <ReportProfit />
      </div>
    </div>
  );
}

export default ReportChart;
