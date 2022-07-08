import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ListCategories from "./ListCategories";
import adminAPI from "../../../api/adminAPI";

CategoriesList.propTypes = {};

function CategoriesList(props) {
  const [categories, setCategories] = React.useState([]);
  const [categoriesPending, setCategoriesPending] = React.useState(false);
  function handleViewCategory() {}
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
  React.useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="content">
      <ListCategories pending={categoriesPending} categories={categories} handleViewCategory={handleViewCategory}/>
    </div>
  );
}

export default CategoriesList;
