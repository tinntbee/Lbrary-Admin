import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import adminAPI from "../../../../../api/adminAPI";
import { Line } from "react-chartjs-2";

ReportProfit.propTypes = {};

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  maintainAspectRatio: false,
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
        text: "Hoa",
        color: "#FFFFFF",
      },
      labelFontColor: "#FFFFFF",
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

function ReportProfit(props) {
  const [data, setData] = React.useState({
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
      .hoaByMonth()
      .then((res) => {
        setData({
          labels,
          datasets: [
            {
              label: res.hoaByMonthLastYear.year,
              data: res.hoaByMonthLastYear.data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              yAxisID: "y",
            },
            {
              label: res.hoaByMonthThisYear.year,
              data: res.hoaByMonthThisYear.data,
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
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bee-card report-profit-card">
      <div className="bee-card-header">
        <h3 className="bee-card-title">THỐNG KÊ DOANH THU</h3>
      </div>
      <div className="bee-card-body">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default ReportProfit;
