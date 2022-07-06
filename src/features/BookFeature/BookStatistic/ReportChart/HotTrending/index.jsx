import React from "react";
import PropTypes from "prop-types";
import BookTrending from "../../../../../components/BookTrending";
import "./style.scss";
import adminAPI from "../../../../../api/adminAPI";
import LoadingAnimationIcon from "../../../../../components/Icon/Animation/LoadingAnimationIcon";

HotTrending.propTypes = {};

function HotTrending(props) {
  const [pending, setPending] = React.useState(false);
  const [data, setData] = React.useState([]);
  const fetchData = async () => {
    setPending(true);
    adminAPI
      .topBooks()
      .then((res) => {
        setData(res);
        console.log({ res });
        setPending(false);
      })
      .catch((err) => {
        console.log({ err });
        setPending(false);
      });
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bee-card hot-trending-card">
      <div className="bee-card-header">
        <h3 className="bee-card-title">HOT TRENDING</h3>
      </div>
      <div className="bee-card-body">
        <div className="books-trending bee-scroll">
          {data.map((item, index) => (
            <BookTrending book={item} key={item._id} />
          ))}
        </div>
        {pending && <LoadingAnimationIcon />}
      </div>
    </div>
  );
}

export default HotTrending;
