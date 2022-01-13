import React from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import adminAPI from "../../../../api/adminAPI";
import { useEffect } from "react";
import { useState } from "react";
import randomColor from "randomcolor";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

UserByFaculty.propTypes = {};

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "rgb(254,254,254)",
      },
    },
    scale: {
      display: false,
    },
  },
};

function UserByFaculty(props) {
  //     faculties: ['FIT']
  // userByFaculty: [5]
  const [data, setData] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const fetchData = async () => {
    adminAPI
      .userByFaculty()
      .then((res) => {
        setData({
          labels: res.faculties,
          datasets: [
            {
              label: "# of Votes",
              data: res.userByFaculty,
              backgroundColor: res.userByFaculty.map(() =>
                randomColor({
                  luminosity: "light",
                  format: "rgba",
                  alpha: 1,
                })
              ),
              borderWidth: 1,
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
        <PolarArea data={data} options={options} />
      </div>
    </div>
  );
}

export default UserByFaculty;
