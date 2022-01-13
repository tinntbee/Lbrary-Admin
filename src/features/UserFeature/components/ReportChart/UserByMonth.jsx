import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import adminAPI from "../../../../api/adminAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

UserByMonth.propTypes = {};

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
function UserByMonth(props) {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [12, 45, 6, 4, 5, 66, 45, 77, 35, 67, 34, 56],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Dataset 2",
        data: [5, 85, 67, 42, 35, 6, 5, 7, 15, 27, 24, 36],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
    ],
  });
  const fetchData = async () => {
    adminAPI
      .userByMonth()
      .then((res) => {
        setData({
          labels,
          datasets: [
            {
              label: res.userByMonthLastYear.year,
              data: res.userByMonthLastYear.data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              yAxisID: "y",
            },
            {
              label: res.userByMonthThisYear.year,
              data: res.userByMonthThisYear.data,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              yAxisID: "y",
            },
          ],
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="card card-danger">
      <div className="card-header">
        <h3 className="card-title">Thống kê Người dùng mới theo tháng</h3>
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
        <Line type="bar" data={data} options={options} />
      </div>
    </div>
  );
}

export default UserByMonth;
