import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import adminAPI from "../../../../../api/adminAPI";
import randomColor from "randomcolor";
import { Pie } from "react-chartjs-2";

ReportByTag.propTypes = {};

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

function ReportByTag(props) {
  const [data, setData] = React.useState({
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
                  alpha: 0.5,
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
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bee-card report-by-tag-card">
      <div className="bee-card-header">
        <h3 className="bee-card-title">THỐNG KÊ THEO THẺ SÁCH</h3>
      </div>
      <div className="bee-card-body">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default ReportByTag;
