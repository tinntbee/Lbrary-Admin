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
import adminAPI from "../../../../api/adminAPI";
import { useEffect } from "react";
import { useState } from "react";
import randomColor from "randomcolor";

BooksByTags.propTypes = {};

const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "rgb(254,254,254)",
      },
    },
  },
};

function BooksByTags(props) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const fetchData = async () => {
    adminAPI
      .booksByTags()
      .then((res) => {
        setData({
          labels: res.labels,
          datasets: [
            {
              data: res.data,
              backgroundColor: res.data.map(() =>
                randomColor({
                  luminosity: "light",
                  format: "rgba",
                  alpha: 0.2,
                })
              ),
              borderColor: res.data.map(() => "rgb(254,254,254)"),
              borderWidth: 1,
              hoverOffset: 4,
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
        <h3 className="card-title">Thống kê theo Thẻ</h3>
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
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default BooksByTags;
