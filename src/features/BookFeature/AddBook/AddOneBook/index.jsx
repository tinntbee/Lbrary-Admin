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

import FroalaEditor from "react-froala-wysiwyg";

// Require Editor JS files.
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/froala_editor.pkgd.min.js";
// import "froala-editor/js/plugins/fullscreen.min.js"

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
import { filesService } from "../../../../services/filesService";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";

AddOneBook.propTypes = {};

function AddOneBook(props) {
  const thumbnailRef = React.useRef();
  const pdfRef = React.useRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pending, setPending] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState({
    // file: undefined,
    // url: "",
  });
  const [pdf, setPdf] = React.useState({
    // requirePassword: false,
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
  const handlePdfChange = (e) => {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setPdf({ ...thumbnail, url: url, file: file, key: "" });
    return () => URL.revokeObjectURL(url);
  };
  const handleRequestPasswordAndPages = (required, pages, _) => {
    setPdf({ ...pdf, pages, requirePassword: required });
  };
  const [book, setBook] = React.useState({
    name: "",
    author: "",
    quote: "",
    description: "",
    price: 0,
    key: "",
    tags: [],
  });
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);

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
    fetchAllTags();
  }, []);

  const FORM_VALIDATION = yup.object().shape({
    name: yup
      .string("Tên Sách")
      .required("Tên sách là trường bắt buộc")
      .trim()
      .test("Exist Book Check", "Tên sách đã tồn tại", (value) => {
        if (value) {
          return adminAPI
            .checkExistBookName({ name: value })
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
    author: yup.string("Tác Giả").required("Tác giả là trường bắt buộc").trim(),
    description: yup
      .string("Mô tả")
      // .required("Mô tả là trường bắt buộc")
      .trim(),
    quote: yup
      .string("Lời bình")
      .required("Lời bình là trường bắt buộc")
      .trim(),
    key: yup.string("Lời bình"),
    price: yup
      .number("Giá trị")
      .test(
        "negative Check",
        "Giá tiền không thể bé hơn 0!",
        (value) => value >= 0
      )
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
      setPending(true);
      if (pdf.requirePassword) {
        enqueueSnackbar(`Mật khẩu hiện tại chưa chính xác!`, {
          variant: "warning",
        });
        setPending(false);
        return;
      }
      if (!pdf.pages || pdf.pages === 0) {
        enqueueSnackbar(`Vui lòng chọn sách có số trang lớn hơn 0!`, {
          variant: "warning",
        });
        setPending(false);
        return;
      }
      var listIdTags = [];
      selectedTags.forEach((tag) => {
        listIdTags.push(tag._id);
      });
      if (listIdTags.length === 0) {
        enqueueSnackbar(`Vui lòng gắn thẻ cho Sách!`, {
          variant: "warning",
        });
        setPending(false);
        return;
      }
      let bookData = { ...values, tags: listIdTags };
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
          setPending(false);
          enqueueSnackbar(`Tạo sách mới thành công!`, {
            variant: "success",
          });
          handleReset();
        })
        .catch((err) => {
          setPending(false);
          switch (err.response.status) {
            case 405:
              enqueueSnackbar(`Mô tả sách không được bỏ trống!`, {
                variant: "error",
              });
              return;
            case 406:
              enqueueSnackbar(`Tên Sách đã tồn tại!`, {
                variant: "error",
              });
              return;
            case 407:
              enqueueSnackbar(`Khởi tạo Ảnh bìa thất bại!`, {
                variant: "error",
              });
              return;
            case 408:
              enqueueSnackbar(`Khởi tạo Intro thất bại!`, {
                variant: "error",
              });
              return;
            case 409:
              enqueueSnackbar(`Mã hóa Sách thất bại!`, {
                variant: "error",
              });
              return;
            case 410:
              enqueueSnackbar(`Không nhận được file Sách!`, {
                variant: "error",
              });
              return;
            default:
              enqueueSnackbar(`Lỗi Server!`, {
                variant: "error",
              });
              return;
          }
        });
    } else {
      enqueueSnackbar(`Bạn chưa tải lên file Sách!`, {
        variant: "warning",
      });
    }
  }
  function handleReset() {
    pdfRef.current.value = null;
    thumbnailRef.current.value = null;
    setThumbnail({});
    setPdf({});
    setSelectedTags([]);
    formik.handleReset();
  }
  const classes = useStyles();
  return (
    <div className={"bee-card add-one-book-container " + props.className}>
      <div className="bee-card-header bg-green-50">
        <h3 className="bee-card-title">THÊM SÁCH</h3>
      </div>
      <div className="bee-card-body row">
        <FormikProvider value={formik}>
          <div className="file-section">
            <div className=" file-box thumbnail-box">
              <div className="file-intro thumbnail-input">
                <button className="upload-g-btn bee-btn yellow">
                  Tải lên ảnh bìa sách
                  <input
                    type={"file"}
                    accept={".jpg,.png,.gif"}
                    onChange={handleThumbnailChange}
                    ref={thumbnailRef}
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
                    onChange={handlePdfChange}
                    ref={pdfRef}
                  />
                </button>
                {!pdf.url ? (
                  <div className="place-holder">
                    <UploadIcon />
                    <p>Tải lên file Sách</p>
                    <i>(.pdf)</i>
                  </div>
                ) : (
                  <>
                    <PDFViewer
                      handleRequestPasswordAndPages={
                        handleRequestPasswordAndPages
                      }
                      url={pdf.url}
                      password={pdf.key}
                      key={pdf.key}
                    />
                    {pdf.requirePassword && (
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
                    )}
                  </>
                )}
              </div>
              {/* <p className="filename">{`book01.png`}</p>
            <p className="desc">{`4Mb`}</p> */}
            </div>
          </div>
          <div className="info-section bee-scroll">
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
              {/* <Grid item className={classes.field}>
                <FastField
                  component={InputField}
                  name="description"
                  label="Mô tả"
                  multiline={true}
                  fields={{ minRows: 5 }}
                />
              </Grid> */}
              <Grid item className={classes.field}>
                <FastField>
                  {({ field, form, meta }) => {
                    return (
                      <FroalaEditor
                        config={{
                          quickInsertTags: [""],
                          toolbarButtons: {
                            moreText: {
                              buttons: [
                                "bold",
                                "italic",
                                "underline",
                                "strikeThrough",
                                "subscript",
                                "superscript",
                                "fontFamily",
                                "fontSize",
                                "textColor",
                                "backgroundColor",
                                "inlineClass",
                                "inlineStyle",
                                "clearFormatting",
                              ],
                              align: "left",
                              buttonsVisible: 3,
                            },
                            moreParagraph: {
                              buttons: [
                                "alignLeft",
                                "alignCenter",
                                "formatOLSimple",
                                "alignRight",
                                "alignJustify",
                                "formatOL",
                                "formatUL",
                                "paragraphFormat",
                                "paragraphStyle",
                                "lineHeight",
                                "outdent",
                                "indent",
                                "quote",
                              ],
                              align: "left",
                              buttonsVisible: 0,
                            },
                            moreMisc: {
                              buttons: [
                                "undo",
                                "redo",
                                "fullscreen",
                                "spellChecker",
                                "html",
                                "insertLink",
                                "emoticons",
                                "fontAwesome",
                                "specialCharacters",
                                "embedly",
                                "insertHR",
                              ],
                              align: "right",
                              buttonsVisible: 2,
                            },
                          },
                        }}
                        className="ReadingSpace__editor"
                        tag="textarea"
                        model={field.value.description}
                        onModelChange={(modal) =>
                          formik.setFieldValue("description", modal)
                        }
                      />
                    );
                  }}
                </FastField>
              </Grid>
            </form>
          </div>
        </FormikProvider>
        {pending && <LoadingAnimationIcon className="absolute" />}
      </div>
      <div className="bee-card-footer">
        <div className="right">
          <button className="bee-btn no-fill" onClick={handleReset}>
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
