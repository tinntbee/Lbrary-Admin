import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import UserByFaculty from "./UserByFaculty/UserByFaculty";
import UserByMonth from "./UserByMonth/UserByMonth";


function ReportChart(props) {
  return (
    <div className="row my-2">
      <div class="col-md-4">
        <UserByFaculty />
      </div>
      <div class="col-md-8">
        <div>
          <UserByMonth />
        </div>
      </div>
    </div>
  );
}

export default ReportChart;
