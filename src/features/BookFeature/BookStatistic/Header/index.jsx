import React from "react";
import PropTypes from "prop-types";
import adminAPI from "../../../../api/adminAPI";
import AddBookIcon from "../../../../components/Icon/AddBookIcon";
import "./style.scss";
import BookIcon from "../../../../components/Icon/BookIcon";
import CartIcon from "../../../../components/Icon/CartIcon";
import FlowerIcon from "../../../../components/Icon/FlowerIcon";
import ChatIcon from "../../../../components/Icon/ChatIcon";
import QuestionChatIcon from "../../../../components/Icon/QuestionChatIcon";
import ThumbUpIcon from "../../../../components/Icon/ThumbUpIcon";
import ThumbDownIcon from "../../../../components/Icon/ThumbDownIcon";

Header.propTypes = {};

function Header(props) {
  const [data, setDate] = React.useState({
    avgDislike: 0,
    avgLike: 0,
    avgReach: 0,
    totalBooks: 0,
    totalHoa: 0,
    totalNewBooks: 0,
    totalReach: 0,
    totalRead: 0,
  });
  const fetchData = async () => {
    adminAPI
      .bookStatistical()
      .then((res) => {
        setDate({ ...data, ...res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="book-header">
      <div className="row">
        <div className="box-m bg-light-green">
          <div className="content">
            <p className="value">{data.totalNewBooks}</p>
            <p className="title">Sách mới</p>
          </div>
          <span className="icon-container">
            <AddBookIcon />
          </span>
        </div>
        <div className="box-m bg-light-red">
          <div className="content">
            <p className="value">{data.totalBooks}</p>
            <p className="title">Tổng số sách</p>
          </div>
          <span className="icon-container">
            <BookIcon />
          </span>
        </div>
        <div className="box-m bg-light-blue">
          <div className="content">
            <p className="value">{data.totalRead}</p>
            <p className="title">Lượt đọc</p>
          </div>
          <span className="icon-container">
            <CartIcon />
          </span>
        </div>
        <div className="box-m bg-light-yellow">
          <div className="content">
            <p className="value">{data.totalHoa}</p>
            <p className="title">Doanh thu</p>
          </div>
          <span className="icon-container">
            <FlowerIcon />
          </span>
        </div>
      </div>
      <div className="row">
        <div className="box">
          <span className="icon-container bg-light-green">
            <ChatIcon />
          </span>
          <div className="content">
            <p className="title">Tương tác</p>
            <p className="value">{data.totalReach}</p>
          </div>
        </div>

        <div className="box">
          <span className="icon-container bg-light-red">
            <QuestionChatIcon />
          </span>
          <div className="content">
            <p className="title">Tương tác trung bình</p>
            <p className="value">{data.avgReach}</p>
          </div>
        </div>

        <div className="box">
          <span className="icon-container bg-light-blue">
            <ThumbDownIcon />
          </span>
          <div className="content">
            <p className="title">Đánh giá tích cực trung bình</p>
            <p className="value">{data.avgLike}</p>
          </div>
        </div>

        <div className="box ">
          <span className="icon-container bg-light-yellow">
            <ThumbUpIcon />
          </span>
          <div className="content">
            <p className="title">Đánh giá tiêu cực trung bình</p>
            <p className="value">{data.avgDislike}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
