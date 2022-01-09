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

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

ReportChart.propTypes = {};

export const facultyChart = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const multiChartData = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: [500, 500, 500, 500, 500, 500, 500],
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: [500, 500, 500, 500, 500, 500, 500],
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 5005)",
      data: [500, 500, 500, 500, 500, 500, 500],
    },
  ],
};

function ReportChart(props) {
  return (
    <div className="row my-2">
      <div class="col-md-4">
        <div className="card card-danger">
          <div className="card-header">
            <h3 className="card-title">Thống kê theo Khoa</h3>
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
          <div className="card-body">
            <Pie data={facultyChart} />
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div>
          <div className="card card-danger">
            <div className="card-header">
              <h3 className="card-title">Thống kê theo tháng</h3>
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
            <div className="card-body">
              <Chart type="bar" data={multiChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportChart;
