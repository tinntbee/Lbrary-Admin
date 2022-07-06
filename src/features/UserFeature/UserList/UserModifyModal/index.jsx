import React from "react";
import PropTypes from "prop-types";
import PopUpModal from "../../../../components/PopUpModal";
import CloseIcon from "../../../../components/Icon/CloseIcon";
import "./style.scss";
import useStyles from "../../../../utils/useStyles";
import sexOptions from "../../../../utils/sexOptions";
import * as yup from "yup";
import { FastField, FormikProvider, useFormik } from "formik";
import { Grid } from "@material-ui/core";
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import { facultyOptions } from "../../../../utils/fakeData";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import adminAPI from "../../../../api/adminAPI";
import { useSnackbar } from "notistack";

UserModifyModal.propTypes = {};

function UserModifyModal(props) {
  const { show, setShow, user, handleModifyUser } = props;
  const classes = useStyles();
  const genders = sexOptions;
  const faculties = facultyOptions;
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
    initialValues: { ...user, dob: user.dob.slice(0, 10) },
    validationSchema: FORM_VALIDATION,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submitModifyUser(values);
    },
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pending, setPending] = React.useState(true);

  function submitModifyUser(values) {
    setPending(true);
    adminAPI
      .modifyUser(values)
      .then((res) => {
        handleModifyUser(res);
        setPending(false);
        enqueueSnackbar("Lưu các thay đổi thành công!", {
          variant: "success",
        });
        setShow(false);
      })
      .catch((error) => {
        setPending(false);
        switch (error.response.status) {
          case 403:
            enqueueSnackbar("Tài khoản email đã tồn tại!", {
              variant: "error",
            });
            break;
          case 404:
            enqueueSnackbar("Không tìm thấy người dùng!", {
              variant: "error",
            });
            break;
          default:
            enqueueSnackbar("Lưu thất bại!", {
              variant: "error",
            });
            break;
        }
      });
  }

  React.useEffect(() => {
    setPending(false);
  }, []);
  return (
    <PopUpModal show={show}>
      <div className="bee-card">
        <div className="bee-card-header bg-green-50">
          <p className="bee-card-title">CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG</p>
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
          <div className="user-modify-container">
            <div
              className="avatar-section"
              style={{ backgroundImage: `url("${user?.avatar}")` }}
            />
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
                      options={genders}
                    />
                  </Grid>
                </form>
              </FormikProvider>
            </div>
            {pending && <LoadingAnimationIcon className="absolute" />}
          </div>
        </div>
        <div className="bee-card-footer">
          <div className="right">
            <button className="bee-btn" onClick={() => setShow(false)}>
              HỦY
            </button>
            <button className="bee-btn blue" onClick={formik.handleSubmit}>
              LƯU THAY ĐỔI
            </button>
          </div>
        </div>
      </div>
    </PopUpModal>
  );
}

export default UserModifyModal;
