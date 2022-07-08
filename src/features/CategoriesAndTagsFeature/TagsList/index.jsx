import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListTags from "./ListTags";
import adminAPI from "../../../api/adminAPI";

TagsList.propTypes = {};

function TagsList(props) {
  const [tagsPending, setTagsPending] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  function handleViewTagDetail() {}
  async function fetchTags() {
    setTagsPending(true);
    adminAPI
      .getAllTagsManage()
      .then((res) => {
        setTags(res);
        setTagsPending(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  }
  React.useEffect(() => {
    fetchTags();
  }, []);
  return (
    <div className="content">
      <ListTags
        tags={tags}
        pending={tagsPending}
        handleViewTagDetail={handleViewTagDetail}
      />
    </div>
  );
}

export default TagsList;
