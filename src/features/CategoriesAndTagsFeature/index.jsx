import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import adminAPI from "../../api/adminAPI";
import TagDetail from "./components/TagDetail";
import CategoryDetail from "./components/CategoryDetail";

CategoriesAndTagsFeature.propTypes = {};

function CategoriesAndTagsFeature(props) {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tagCurrent, setTagCurrent] = useState({ _id: "new", index: -1 });
  const [categoryCurrent, setCategoryCurrent] = useState({
    _id: "new",
    index: -1,
  });

  const handleLockTagClick = (_id) => {
    adminAPI
      .banTag({ _id, is_active: 0 })
      .then((res) => {
        let newTags = [...tags];
        newTags.filter((item) => item._id === _id)[0].is_active = res.is_active;
        setTags([...newTags]);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const handleOpenTagClick = (_id) => {
    adminAPI
      .banTag({ _id, is_active: 1 })
      .then((res) => {
        let newTags = [...tags];
        newTags.filter((item) => item._id === _id)[0].is_active = res.is_active;
        setTags([...newTags]);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const handleTagModifyClick = (_id, index) => {
    setTagCurrent({ _id, index });
  };
  const handleLockCategoryClick = (_id) => {
    adminAPI
      .banCategory({ _id, is_active: 0 })
      .then((res) => {
        let newCategories = [...categories];
        newCategories.filter((item) => item._id === _id)[0].is_active =
          res.is_active;
        setCategories([...newCategories]);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handleOpenCategoryClick = (_id) => {
    adminAPI
      .banCategory({ _id, is_active: 1 })
      .then((res) => {
        let newCategories = [...categories];
        newCategories.filter((item) => item._id === _id)[0].is_active =
          res.is_active;
        setCategories([...newCategories]);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const handleCategoryModifyClick = (_id, index) => {
    setCategoryCurrent({ _id, index });
  };

  const handleCreateNewCategoryClick = () => {
    setCategoryCurrent({ ...categoryCurrent, _id: "new", index: -1 });
  };
  const handleCreateNewTagClick = () => {
    setTagCurrent({ ...tagCurrent, _id: "new", index: -1 });
  };

  const handleUpdateTagsList = (tag, index) => {
    if (index > -1) {
      let newTags = [...tags];
      newTags[index] = tag;
      setTags([...newTags]);
    } else {
      let newTags = [...tags];
      newTags.unshift(tag);
      setTags([...newTags]);
    }
  };
  const handleUpdateCategoriesList = (category, index) => {
    if (index > -1) {
      let newCategories = [...categories];
      newCategories[index] = category;
      setCategories([...newCategories]);
    } else {
      let newCategories = [...categories];
      newCategories.unshift(category);
      setCategories([...newCategories]);
    }
  };
  const fetchTags = async () => {
    adminAPI
      .getAllTagsManage()
      .then((res) => {
        setTags(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const fetchCategories = async () => {
    adminAPI
      .getAllCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);
  return (
    <div className="content">
      <TagDetail
        _id={tagCurrent._id}
        index={tagCurrent.index}
        handleUpdateTagsList={handleUpdateTagsList}
      />
      <CategoryDetail
        _id={categoryCurrent._id}
        index={categoryCurrent.index}
        handleUpdateCategoriesList={handleUpdateCategoriesList}
      />
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Quản lí Danh mục và Thẻ Sách</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="row">
          <div className="col-8">
            <div class="card card-warning card-outline">
              <div class="card-header">
                <h4 className="m-0">Thẻ Sách</h4>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool btn-success"
                    data-toggle="modal"
                    data-target="#modal-tag"
                    onClick={handleCreateNewTagClick}
                  >
                    <i className="fas fa-plus" /> Thêm
                  </button>
                </div>
              </div>
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>_id</th>
                      <th>Tên thẻ</th>
                      <th>Mô tả</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tags &&
                      tags.map((item, index) => {
                        return (
                          <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                              {item.is_active == 1 ? (
                                <span
                                  class="badge bg-success"
                                  onClick={() => handleLockTagClick(item._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  Hoạt động
                                </span>
                              ) : (
                                <span
                                  class="badge bg-warning"
                                  onClick={() => handleOpenTagClick(item._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fas fa-lock"></i> Khóa
                                </span>
                              )}
                            </td>
                            <td>
                              <span>
                                <button
                                  type="button"
                                  class="mr-2 btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#modal-tag"
                                  onClick={() => {
                                    handleTagModifyClick(item._id, index);
                                  }}
                                >
                                  <i className="fas fa-pen-alt"></i>
                                </button>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>_id</th>
                      <th>Tên thẻ</th>
                      <th>Mô tả</th>
                      <th>Trạng thái</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div class="card card-warning card-outline">
              <div class="card-header">
                <h4 className="m-0">Danh mục Sách</h4>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool btn-success"
                    data-toggle="modal"
                    data-target="#modal-category"
                    onClick={handleCreateNewCategoryClick}
                  >
                    <i className="fas fa-plus" /> Thêm
                  </button>
                </div>
              </div>
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên</th>
                      <th>Quote</th>
                      <th>Danh sách thẻ</th>
                      <th>Màu chủ đề</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories &&
                      categories.map((item, index) => {
                        return (
                          <tr key={item._id}>
                            <td>
                              <img
                                style={{ width: "200px" }}
                                alt=""
                                src={item.thumbnail}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quote}</td>
                            <td>
                              {item.tags &&
                                item.tags.map((item, index) => {
                                  return (
                                    <>
                                      <span class="badge bg-orange">
                                        {"#" + item.name}
                                      </span>{" "}
                                    </>
                                  );
                                })}
                            </td>
                            <td>{item.color}</td>
                            <td>
                              {item.is_active == 1 ? (
                                <span
                                  class="badge bg-success"
                                  onClick={() =>
                                    handleLockCategoryClick(item._id)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  Hoạt động
                                </span>
                              ) : (
                                <span
                                  class="badge bg-warning"
                                  onClick={() =>
                                    handleOpenCategoryClick(item._id)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fas fa-lock"></i> Khóa
                                </span>
                              )}
                            </td>
                            <td>
                              <span>
                                <button
                                  type="button"
                                  class="mr-2 btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#modal-category"
                                  onClick={() => {
                                    handleCategoryModifyClick(item._id, index);
                                  }}
                                >
                                  <i className="fas fa-pen-alt"></i>
                                </button>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>_id</th>
                      <th>Tên thẻ</th>
                      <th>Mô tả</th>
                      <th>Trạng thái</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CategoriesAndTagsFeature;
