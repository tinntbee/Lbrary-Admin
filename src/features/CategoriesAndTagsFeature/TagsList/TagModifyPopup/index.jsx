import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import PopUpModal from "../../../../components/PopUpModal";
import CloseIcon from "../../../../components/Icon/CloseIcon";
import * as yup from "yup";
import { FastField, FormikProvider, useFormik } from "formik";
import { Grid } from "@material-ui/core";
import useStyles from "../../../../utils/useStyles";
import InputField from "../../../../components/InputField";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import adminAPI from "../../../../api/adminAPI";

TagModifyPopup.propTypes = {};

function TagModifyPopup(props) {
  const classes = useStyles();
  const { show, setShow, tag, pending, handleModifyTag, handleCreateTag } =
    props;
  const FORM_VALIDATION = yup.object().shape({
    _id: yup.string("Id"),
    name: yup
      .string("Tên thẻ")
      .required("Tên thẻ là trường bắt buộc")
      .test("Exist Tag Check", "Tên thẻ đã tồn tại", (value) => {
        if (value && tag.name !== value) {
          return adminAPI
            .checkExistTagName({ name: value })
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
    description: yup.string("Mô tả").required("Mô tả là trường bắt buộc"),
  });
  const formik = useFormik({
    initialValues: tag,
    validationSchema: FORM_VALIDATION,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submitModifyTag(values);
    },
  });
  function submitModifyTag(values) {
    if (values._id && values._id !== "new") {
      handleModifyTag(values);
    } else {
      handleCreateTag(values);
    }
  }
  return (
    <PopUpModal show={show}>
      <div className="bee-card">
        <div className="bee-card-header bg-green-50">
          <p className="bee-card-title">
            {!tag._id || tag._id !== "new"
              ? "CHỈNH SỬA THẺ SÁCH"
              : "THÊM THẺ SÁCH"}
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
          <div className="tag-modify-container">
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <Grid item className={classes.field}>
                  <FastField
                    component={InputField}
                    name="name"
                    label="# Tên thẻ"
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                </Grid>
                <Grid item className={classes.field}>
                  <FastField
                    component={InputField}
                    name="description"
                    label="Mô tả"
                    multiline={true}
                    fields={{ minRows: 5 }}
                  />
                </Grid>
              </form>
            </FormikProvider>
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
            <button className="bee-btn blue" onClick={formik.handleSubmit}>
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
        {pending && <LoadingAnimationIcon className="absolute" />}
      </div>
    </PopUpModal>
  );
}

export default TagModifyPopup;
