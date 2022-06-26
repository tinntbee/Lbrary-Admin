import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import adminAPI from "../../../../../api/adminAPI";
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
  layout: {
    autoPadding: false,
  },
  stacked: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        color: "rgb(254,254,254)",
      },
      title: {
        display: false,
        color: "rgb(254,254,254)",
      },
    },
    tooltip: {
      titleColor: "rgb(254,254,254)",
    },
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      ticks: { color: "white", beginAtZero: true },
      title: {
        display: false,
        text: "Tháng",
        color: "#FFFFFF",
      },
    },
    y: {
      type: "linear",
      display: true,
      position: "left",
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      ticks: { color: "white", beginAtZero: true },
      title: {
        display: true,
        text: "Lượt truy cập",
        color: "#FFFFFF",
      },
      labelFontColor: "#FFFFFF",
    },
  },
};

const labels = [
  "Tháng 01",
  "Tháng 02",
  "Tháng 03",
  "Tháng 04",
  "Tháng 05",
  "Tháng 06",
  "Tháng 07",
  "Tháng 08",
  "Tháng 09",
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
    <div className="bee-card bee-card-user-by-month">
      <div className="bee-card-header">
        <h3 className="bee-card-title">THỐNG KÊ NGƯỜI DÙNG MỚI THEO THÁNG </h3>
        <div className="bee-card-tools"></div>
      </div>
      <div className="bee-card-body">
        <Line type="bar" data={data} options={options} />
      </div>
    </div>
  );
}

export default UserByMonth;
