import React from "react";
import PropTypes from "prop-types";
import PopUpModal from "../../../../components/PopUpModal";
import CloseIcon from "../../../../components/Icon/CloseIcon";
import { FastField, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import useStyles from "../../../../utils/useStyles";
import { Grid } from "@material-ui/core";
import InputField from "../../../../components/InputField";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import adminAPI from "../../../../api/adminAPI";
import { useSnackbar } from "notistack";
import TagsMultiSelectField from "../../../../components/TagsMultiSelectField";
import "./style.scss";
import UploadIcon from "../../../../components/Icon/UploadIcon";

CategoryModifyPopup.propTypes = {};

function CategoryModifyPopup(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    show = true,
    category = {},
    setShow,
    handleModifyCategory,
    handleCreateCategory,
    pending,
  } = props;
  const classes = useStyles();
  const [thumbnail, setThumbnail] = React.useState({ url: "", file: null });
  const [tags, setTags] = React.useState([]);
  const FORM_VALIDATION = yup.object().shape({
    _id: yup.string("Id"),
    name: yup
      .string("Tên danh mục")
      .required("Tên danh mục là trường bắt buộc")
      .test("Exist Category Check", "Tên Danh mục đã tồn tại", (value) => {
        if (value && category.name !== value) {
          return adminAPI
            .checkExistCategoryName({ name: value })
            .then(() => true)
            .catch((error) => {
              if (error.response.status === 406) {
                return false;
              }
              return true;
            });
        } else {
          return true;
        }
      }),
    quote: yup.string("Mô tả").required("Mô tả là trường bắt buộc"),
  });
  const formik = useFormik({
    initialValues: category,
    validationSchema: FORM_VALIDATION,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submitModifyCategory(values);
    },
  });
  function submitModifyCategory(values) {
    var listIdTags = [];
    values.tags.forEach((tag) => {
      listIdTags.push(tag._id);
    });
    console.log({ ...values, tags: listIdTags });

    if (values._id && values._id !== "new") {
      handleModifyCategory({ ...values, tags: listIdTags });
    } else {
      //   handleCreateCategory(values);
    }
  }
  const fetchAllTags = async () => {
    adminAPI
      .getAllTags()
      .then((res) => {
        setTags(res);
        // if (res && res.length > 0) {
        //   setSelectedTags([res[0]]);
        // }
      })
      .catch((err) => {
        console.log({ err });
        enqueueSnackbar(`Tải danh thẻ sách thất bại!`, {
          variant: "warning",
        });
      });
  };
  React.useEffect(() => {
    if (category.thumbnail) {
      setThumbnail({ url: category.thumbnail, file: null });
    }
  }, [category]);
  React.useEffect(() => {
    fetchAllTags();
  }, []);
  return (
    <PopUpModal show={show}>
      <div className="bee-card">
        <div className="bee-card-header bg-green-50">
          <p className="bee-card-title">
            {category._id && category._id !== "new"
              ? "CHỈNH SỬA DANH MỤC"
              : "THÊM DANH MỤC"}
          </p>
          <div className="bee-card-actions">
            <button
              className="bee-btn close-btn"
              onClick={() => {
                setShow(false);
              }}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="bee-card-body">
          <div className="category-modify-container row">
            <div className="thumbnail-section col">
              <button className="bee-btn yellow" style={{ width: "100%" }}>
                <UploadIcon />
                Lựa chọn ảnh chủ đề
                <input type={"file"} accept=".png,.jpg,.gif" />
              </button>
              {thumbnail.url && (
                <img alt="" className="thumbnail" src={thumbnail.url} />
              )}
            </div>
            <div className="information-section">
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid item className={classes.field}>
                    <FastField
                      component={InputField}
                      name="name"
                      label="Tên danh mục"
                      inputProps={{ style: { textTransform: "uppercase" } }}
                    />
                  </Grid>
                  <Grid item className={classes.field}>
                    <FastField
                      component={InputField}
                      name="quote"
                      label="Câu chủ đề"
                      multiline={true}
                      fields={{ minRows: 5 }}
                    />
                  </Grid>
                  <Grid container>
                    <Grid item xs={10} className={classes.field}>
                      <FastField
                        component={InputField}
                        name="color"
                        label="Màu chủ đề"
                      />
                    </Grid>
                    <Grid item xs={2} className={classes.field}>
                      <FastField>
                        {({ field, form, meta }) => {
                          return (
                            <div
                              className="color-box"
                              style={{ background: `${field.value.color}` }}
                            ></div>
                          );
                        }}
                      </FastField>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.field}>
                    <TagsMultiSelectField
                      value={formik.values.tags}
                      setValue={(values) =>
                        formik.setFieldValue("tags", values)
                      }
                      options={tags}
                    />
                  </Grid>
                </form>
              </FormikProvider>
            </div>
          </div>
        </div>
        <div className="bee-card-footer">
          <div className="right">
            <button
              className="bee-btn"
              onClick={() => {
                setShow(false);
                formik.handleReset();
              }}
            >
              HỦY
            </button>
            <button
              //   type="submit"
              className="bee-btn blue"
              onClick={formik.handleSubmit}
            >
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
        {pending && <LoadingAnimationIcon className="absolute" />}
      </div>
    </PopUpModal>
  );
}

export default CategoryModifyPopup;
