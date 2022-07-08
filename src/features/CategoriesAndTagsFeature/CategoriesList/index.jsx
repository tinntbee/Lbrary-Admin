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
  function handleCreateCategory() {}
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
      />
      <CategoryModifyPopup
        show={showCategoryModifyPopup}
        category={category}
        setShow={setShowCategoryModifyPopup}
        handleModifyCategory={handleModifyCategory}
        pending={categoryPending}
        handleCreateCategory={handleCreateCategory}
      />
    </div>
  );
}

export default CategoriesList;
