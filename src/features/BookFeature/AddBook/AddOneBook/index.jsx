import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import UploadIcon from "../../../../components/Icon/UploadIcon";
import PDFViewer from "../../../../components/PDFViewer";
import useStyles from "../../../../utils/useStyles";
import * as yup from "yup";
import { Grid, makeStyles } from "@material-ui/core";
import InputField from "../../../../components/InputField";
import { FastField, FormikProvider, useFormik } from "formik";
import TagsMultiSelectField from "../../../../components/TagsMultiSelectField";
import { useSnackbar } from "notistack";
import adminAPI from "../../../../api/adminAPI";

AddOneBook.propTypes = {};

function AddOneBook(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [thumbnail, setThumbnail] = React.useState({
    // file: undefined,
    // url: "",
  });
  const [pdf, setPdf] = React.useState({
    // file: undefined,
    // url: "https://firebasestorage.googleapis.com/v0/b/library-online-3ec9d.appspot.com/o/books%2Fpdf%2FTin%20Nguyen%20Trung%20-%20CV%20Fresher%20Front-end%20Software%20Engineer%20-%C4%91%C3%A3%20b%E1%BA%A3o%20v%E1%BB%87-ver1641915725851.pdf?alt=media&token=25f5c6fb-7b51-46d7-b181-b7ae4aabc59b",
  });
  const handleThumbnailChange = (e) => {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setThumbnail({ ...thumbnail, url: url, file: file });
    return () => URL.revokeObjectURL(url);
  };
  // const handleRemoveThumbnail = () => {
  //   setThumbnail();
  // };
  const handleTPdfChange = (e) => {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setPdf({ ...thumbnail, url: url, file: file, key: "" });
    return () => URL.revokeObjectURL(url);
  };
  const [book, setBook] = React.useState({
    name: "",
    author: "",
    quote: "",
    description: "",
    price: "",
    key: "",
    tags: [],
  });
  const [selectedTags, setSelectedTags] = React.useState([
    {
      _id: "1",
      name: "KHOA HỌC",
    },
  ]);
  const [tags, setTags] = React.useState([
    {
      _id: "1",
      name: "KHOA HỌC",
    },
    {
      _id: "2",
      name: "VĂN HỌC",
    },
    {
      _id: "3",
      name: "KHOA HỌC",
    },
    {
      _id: "4",
      name: "VĂN HỌC",
    },
    {
      _id: "5",
      name: "KHOA HỌC",
    },
    {
      _id: "6",
      name: "VĂN HỌC VĂN HỌC",
    },
    {
      _id: "7",
      name: "KHOA HỌC",
    },
    {
      _id: "8",
      name: "VĂN HỌC",
    },
    {
      _id: "9",
      name: "KHOA HỌC",
    },
    {
      _id: "10",
      name: "VĂN HỌC",
    },
  ]);
  const FORM_VALIDATION = yup.object().shape({
    name: yup.string("Tên Sách").required("Tên sách là trường bắt buộc").trim(),
    author: yup.string("Tác Giả").required("Tác giả là trường bắt buộc").trim(),
    description: yup
      .string("Mô tả")
      .required("Mô tả là trường bắt buộc")
      .trim(),
    quote: yup
      .string("Lời bình")
      .required("Lời bình là trường bắt buộc")
      .trim(),
    key: yup.string("Lời bình"),
    price: yup
      .number("Giá trị")
      .moreThan(0, "Giá trị không thể nhỏ hơn 0")
      .lessThan(1000, "Giá trị không thể vượt quá 1000")
      .required("Gía trị là trường bắt buộc"),
  });
  const formik = useFormik({
    initialValues: book,
    validationSchema: FORM_VALIDATION,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submitCreateBook(values);
    },
    onChange: (values) => {},
  });
  function submitCreateBook(values) {
    if (pdf && pdf.file) {
      let bookData = { ...values, tags: tags };
      var formData = new FormData();
      if (thumbnail && thumbnail.file) {
        formData.append("thumbnail", thumbnail.file);
      }
      formData.append("pdf", pdf.file);
      formData.append("detail", JSON.stringify(bookData));
      console.log({ formData });
      adminAPI
        .postBook(formData)
        .then((res) => {
          console.log({ res });
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      enqueueSnackbar(`Bạn chưa tải lên file Sách!`, {
        variant: "warning",
      });
    }
  }
  const classes = useStyles();
  return (
    <div className={"bee-card add-one-book-container " + props.className}>
      <div className="bee-card-header bg-green-50">
        <h3 className="bee-card-title">THÊM SÁCH</h3>
      </div>
      <div className="bee-card-body row">
        <div className="file-section">
          <div className=" file-box thumbnail-box">
            <div className="file-intro thumbnail-input">
              <button className="upload-g-btn bee-btn yellow">
                Tải lên ảnh bìa sách
                <input
                  type={"file"}
                  accept={".jpg,.png,.gif"}
                  onChange={handleThumbnailChange}
                />
              </button>
              {!thumbnail.url ? (
                <div className="place-holder">
                  <UploadIcon />
                  <p>Tải lên ảnh bìa sách</p>
                  <i>(.jpg, .png, .gif)</i>
                </div>
              ) : (
                <>
                  <div
                    className="image-intro"
                    style={
                      thumbnail.url
                        ? { backgroundImage: `url("${thumbnail.url}")` }
                        : {}
                    }
                  ></div>
                  {/* <button
                    className="cancel-g-btn bee-btn red"
                    onClick={handleRemoveThumbnail}
                  >
                    Tự động lấy bìa từ Sách
                  </button> */}
                </>
              )}
            </div>
            {/* <p className="filename">{`book01.png`}</p>
            <p className="desc">{`4Mb`}</p> */}
          </div>
          <div className=" file-box pdf-box">
            <div className="file-intro pdf-input">
              <button className="upload-g-btn bee-btn yellow">
                Tải lên file Sách
                <input
                  className="bee-btn"
                  type={"file"}
                  accept={".pdf"}
                  onChange={handleTPdfChange}
                />
              </button>
              {!pdf.url ? (
                <div className="place-holder">
                  <UploadIcon />
                  <p>Tải lên file Sách</p>
                  <i>(.pdf)</i>
                </div>
              ) : (
                <PDFViewer url={pdf.url} password={pdf.key} key={pdf.key} />
              )}
            </div>
            {/* <p className="filename">{`book01.png`}</p>
            <p className="desc">{`4Mb`}</p> */}
          </div>
        </div>
        <div className="info-section bee-scroll">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="name"
                  label="Tựa Sách"
                  multiline={true}
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="author"
                  label="Tác giả"
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="key"
                  label="Mật khẩu hiện tại"
                  fields={{
                    onBlur: (e) => {
                      setPdf({ ...pdf, key: e.target.value });
                    },
                  }}
                />
              </Grid>
              <Grid item className={classes.field}>
                <TagsMultiSelectField
                  value={selectedTags}
                  setValue={setSelectedTags}
                  options={tags}
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="price"
                  label="Giá trị"
                  type="number"
                  inputProps={{ min: 0, max: 10 }}
                />
              </Grid>
              <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="quote"
                  label="Lời bình"
                  multiline={true}
                  fields={{ minRows: 3 }}
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

export default AddOneBook;
