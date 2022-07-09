import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListCategories from "./ListCategories";
import adminAPI from "../../../api/adminAPI";
import CategoryModifyPopup from "./CategoryModifyPopup";
import sleep from "../../../utils/sleep";
import { useSnackbar } from "notistack";

CategoriesList.propTypes = {};

function CategoriesList(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [categories, setCategories] = React.useState([]);
  const [categoriesPending, setCategoriesPending] = React.useState(false);
  const [category, setCategory] = React.useState({
    _id: "new",
    quote: "",
    name: "",
    tags: [],
    color: "",
    thumbnail: "",
  });
  const [categoryPending, setCategoryPending] = React.useState(false);
  const [showCategoryModifyPopup, setShowCategoryModifyPopup] =
    React.useState(false);
  async function handleViewCategory(_id) {
    const categoryDetail = categories.find((c) => c._id === _id);
    if (categoryDetail) {
      setShowCategoryModifyPopup(true);
      setCategoryPending(true);
      await sleep(1000);
      setCategory(categoryDetail);
      setCategoryPending(false);
    }
  }
  function handleShowNewCategory() {
    setCategory({
      _id: "new",
      quote: "",
      name: "",
      tags: [],
      color: "",
      thumbnail: "",
    });
    setShowCategoryModifyPopup(true);
  }
  async function fetchCategories() {
    setCategoriesPending(true);
    adminAPI
      .getAllCategories()
      .then((res) => {
        setCategories(res);
        setCategoriesPending(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  }
  function handleModifyCategory(category) {
    setCategoryPending(true);
    adminAPI
      .editCategory(category)
      .then((res) => {
        let newCategories = [...categories];
        const index = newCategories.findIndex((c) => c._id === res._id);
        if (index >= 0) {
          newCategories[index] = res;
          setCategories([...newCategories]);
          setCategoryPending(false);
          setCategory(res);
          setShowCategoryModifyPopup(false);
        }
        enqueueSnackbar(`Lưu các thay đổi thành công!`, {
          variant: "success",
        });
      })
      .catch((err) => {
        setCategoryPending(false);
        if (err.respond.status === 406) {
          enqueueSnackbar(`Tên danh mục đã tồn tại!`, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(`Thao tác thất bại!`, {
            variant: "error",
          });
        }
      });
  }
  function handleCreateCategory(category) {
    setCategoryPending(true);
    adminAPI
      .createCategory(category)
      .then((res) => {
        console.log({ res });
        let newCategories = [...categories];
        if (res) {
          newCategories.push(res);
          setCategories([...newCategories]);
          setCategory(res);
        }
        setCategoryPending(false);
        setShowCategoryModifyPopup(false);
        enqueueSnackbar(`Tạo danh mục thành công!`, {
          variant: "success",
        });
      })
      .catch((err) => {
        setCategoryPending(false);
        if (err.respond.status === 406) {
          enqueueSnackbar(`Tên danh mục đã tồn tại!`, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(`Thao tác thất bại!`, {
            variant: "error",
          });
        }
      });
  }
  function handleBanCategory(_id, is_active, name) {
    adminAPI
      .banCategory({ _id: _id, is_active: is_active })
      .then((res) => {
        let newCategories = [...categories];
        newCategories.find((e) => e._id === _id).is_active = res.is_active;
        setCategories([...newCategories]);
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
    fetchCategories();
  }, []);
  return (
    <div className="content">
      <ListCategories
        pending={categoriesPending}
        categories={categories}
        handleViewCategory={handleViewCategory}
        handleShowNewCategory={handleShowNewCategory}
        handleBanCategory={handleBanCategory}
      />
      <CategoryModifyPopup
        show={showCategoryModifyPopup}
        category={category}
        setShow={setShowCategoryModifyPopup}
        handleModifyCategory={handleModifyCategory}
        pending={categoryPending}
        handleCreateCategory={handleCreateCategory}
        setPending={setCategoryPending}
      />
    </div>
  );
}

export default CategoriesList;
