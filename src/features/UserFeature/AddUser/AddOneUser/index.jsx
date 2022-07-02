import React from "react";
import { facultyOptions, imageAvatarList } from "../../../../utils/fakeData";
import * as yup from "yup";
import { FastField, FormikProvider, useFormik } from "formik";
import "./style.scss";
import InputField from "../../../../components/InputField";
import { Grid, makeStyles } from "@material-ui/core";
import SelectField from "../../../../components/SelectField";
import sexOptions from "../../../../utils/sexOptions";
import useStyles from "../../../../utils/useStyles";

function AddOneUser(props) {
  const { className } = props;
  const classes = useStyles();
  const images = imageAvatarList;
  const faculties = facultyOptions;
  const [indexAvatar, setIndexAvatar] = React.useState(0);
  const [user, setUser] = React.useState({
    nickname: "",
    name: "",
    faculty: "",
    gender: "",
    email: "",
    dob: "1900-01-01",
    avatar: images[0]?.url,
  });
  const yesterday = new Date(Date.now() - 86400000);
  const FORM_VALIDATION = yup.object().shape({
    nickname: yup.string("Tên hiển thị với người dùng khác").trim(),
    name: yup.string("Tên đầy đủ ").required("Tên đầy đủ là trường bắt buộc"),
    gender: yup
      .string("Giới tính Sinh viên")
      .required("Giới tính là trường bắt buộc"),
    faculty: yup.string("Khoa đang học").required("Khoa là trường bắt buộc"),
    email: yup
      .string("Email Sinh viên")
      .email("Email không hợp lệ")
      .required("Email là trường bắt buộc"),
    dob: yup.date().max(yesterday, "Ngày sinh không hợp lệ").required(),
    avatar: yup.string(),
  });
  const formik = useFormik({
    initialValues: user,
    validationSchema: FORM_VALIDATION,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submitCreateUser(values);
    },
  });
  function submitCreateUser(values) {
    values = { ...values, avatar: images[indexAvatar].url };
    alert(JSON.stringify(values, null, 2));
  }
  return (
    <div className={"bee-card add-one-user-container " + className}>
      <div className="bee-card-header bg-green-50">
        <h3 className="bee-card-title">TẠO TÀI KHOẢN</h3>
      </div>
      <div className="bee-card-body">
        <div className="avatar-section">
          <div
            className="avatar"
            style={{ backgroundImage: `url("${images[indexAvatar]?.url}")` }}
          />
          <div className="images">
            {images.map((item, index) => (
              <div
                className={index === indexAvatar ? "image active" : "image"}
                style={{ backgroundImage: `url("${item?.url}")` }}
                key={index}
                onClick={() => {
                  setIndexAvatar(index);
                }}
              />
            ))}
          </div>
        </div>
        <div className="information-section">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="name"
                  label="Họ và tên"
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="nickname"
                  label="Tên hiển thị"
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="email"
                  label="Địa chỉ email"
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="dob"
                  label="Ngày Sinh"
                  type="date"
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={SelectField}
                  name="faculty"
                  label="Khoa"
                  options={faculties}
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={SelectField}
                  name="gender"
                  label="Giới tính"
                  options={sexOptions}
                />
              </Grid>
            </form>
          </FormikProvider>
        </div>
      </div>
      <div className="bee-card-footer">
        <div className="right">
          <button className="bee-btn no-fill" onClick={formik.handleReset}>
            DỌN DẸP
          </button>
          <button className="bee-btn blue" onClick={formik.handleSubmit}>
            TẠO MỚI
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOneUser;
