import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListTags from "./ListTags";
import adminAPI from "../../../api/adminAPI";
import TagModifyPopup from "./TagModifyPopup";
import sleep from "../../../utils/sleep";
import { useSnackbar } from "notistack";

TagsList.propTypes = {};

function TagsList(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tagsPending, setTagsPending] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [tag, setTag] = React.useState({
    _id: "new",
    name: "",
    description: "",
  });
  const [tagPending, setTagPending] = React.useState(false);
  const [showTagModifyPopup, setShowTagModifyPopup] = React.useState(false);
  async function handleViewTagDetail(_id) {
    const tagDetail = tags.find((t) => t._id === _id);
    if (tagDetail) {
      setShowTagModifyPopup(true);
      setTagPending(true);
      await sleep(1000);
      setTag(tagDetail);
      setTagPending(false);
    }
  }
  function handleModifyTag(tag) {
    setTagPending(true);
    adminAPI
      .editTag(tag)
      .then((res) => {
        let newTags = [...tags];
        const index = newTags.findIndex((t) => t._id === res._id);
        if (index >= 0) {
          newTags[index] = res;
          setTags([...newTags]);
          setTagPending(false);
          setTag(res);
          setShowTagModifyPopup(false);
        }
        enqueueSnackbar(`Lưu các thay đổi thành công!`, {
          variant: "success",
        });
      })
      .catch((err) => {
        if (err.respond.status === 406) {
          enqueueSnackbar(`Tên thẻ đã tồn tại!`, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(`Thao tác thất bại!`, {
            variant: "error",
          });
        }
      });
  }
  function handleCreateTag(tag) {
    setTagPending(true);
    adminAPI
      .createTag(tag)
      .then((res) => {
        let newTags = [...tags];
        newTags.push(res);
        setTags([...newTags]);
        setTagPending(false);
        setTag(res);
        setShowTagModifyPopup(false);
      })
      .catch((err) => {
        if (err.respond.status === 406) {
          enqueueSnackbar(`Tên thẻ đã tồn tại!`, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(`Thao tác thất bại!`, {
            variant: "error",
          });
        }
      });
  }
  function handleShowNewTag() {
    setTag({ _id: "new", name: "", description: "" });
    setShowTagModifyPopup(true);
  }
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
  async function handleBanTag(_id, is_active, name) {
    adminAPI
      .banTag({ _id: _id, is_active: is_active })
      .then((res) => {
        let newTags = [...tags];
        newTags.find((e) => e._id === _id).is_active = res.is_active;
        setTags([...newTags]);
        if (is_active === 0) {
          enqueueSnackbar(`Đã khóa: "${name}"!`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Đã mở khóa: "${name}"!`, {
            variant: "success",
          });
        }
      })
      .catch((e) => {
        enqueueSnackbar(`Thao tác thất bại!`, {
          variant: "error",
        });
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
        handleShowNewTag={handleShowNewTag}
        handleBanTag={handleBanTag}
      />
      <TagModifyPopup
        show={showTagModifyPopup}
        tag={tag}
        setShow={setShowTagModifyPopup}
        handleModifyTag={handleModifyTag}
        pending={tagPending}
        handleCreateTag={handleCreateTag}
      />
    </div>
  );
}

export default TagsList;
