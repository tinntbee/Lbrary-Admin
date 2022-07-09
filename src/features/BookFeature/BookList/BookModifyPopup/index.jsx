import React from "react";
import PopUpModal from "../../../../components/PopUpModal";
import UploadIcon from "../../../../components/Icon/UploadIcon";
import PDFViewer from "../../../../components/PDFViewer";
import useStyles from "../../../../utils/useStyles";
import * as yup from "yup";
import { Grid, makeStyles } from "@material-ui/core";
import InputField from "../../../../components/InputField";
import { FastField, FormikProvider, useFormik } from "formik";
import TagsMultiSelectField from "../../../../components/TagsMultiSelectField";
import FroalaEditor from "react-froala-wysiwyg";
import { useSnackbar } from "notistack";

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
import adminAPI from "../../../../api/adminAPI";
import "./style.scss";
import CloseIcon from "../../../../components/Icon/CloseIcon";
import sleep from "../../../../utils/sleep";

function BookModifyPopup(props) {
  const ref = React.useRef();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { book, pending, show, setShow, setPending, handleModify } = props;
  const [thumbnail, setThumbnail] = React.useState({ url: "", file: "" });
  const [tags, setTags] = React.useState([]);
  const [pdf, setPdf] = React.useState({
    url: "",
    file: "",
    requirePassword: false,
    key: "",
  });
  const FORM_VALIDATION = yup.object().shape({
    name: yup
      .string("Tên Sách")
      .required("Tên sách là trường bắt buộc")
      .trim()
      .test("Exist Book Check", "Tên sách đã tồn tại", (value) => {
        if (value && value !== book.name) {
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
    description: yup.string("Mô tả"),
    // .required("Mô tả là trường bắt buộc"),
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
    initialValues: { ...book, quote: book.quote[0] ? book.quote[0] : "" },
    validationSchema: FORM_VALIDATION,
    enableReinitialize: true,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      submitModifyBook(values);
    },
  });
  async function submitModifyBook(values) {
    setPending(true);
    await sleep(2000);
    var listIdTags = [];
    values.tags.forEach((tag) => {
      listIdTags.push(tag._id);
    });
    if (listIdTags.length === 0) {
      enqueueSnackbar(`Vui lòng gắn thẻ cho Sách!`, {
        variant: "warning",
      });
      setPending(false);
      return;
    }
    handleModify({ ...values, tags: listIdTags }, pdf.file, thumbnail.file);
  }
  function handleThumbnailChange(e) {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setThumbnail({ ...thumbnail, url: url, file: file });
    e.target.value = null;
    return () => URL.revokeObjectURL(url);
  }
  function handlePdfChange(e) {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setPdf({ ...pdf, url: url, file: file, key: "" });
    e.target.value = null;
    return () => URL.revokeObjectURL(url);
  }
  const handleRequestPasswordAndPages = (required, pages, _) => {
    setPdf({ ...pdf, pages, requirePassword: required });
  };
  function handleReset() {
    setThumbnail({ url: book.image, file: null });
    setPdf({
      url: book.link,
      key: book.key,
      file: null,
      requirePassword: false,
    });
    formik.handleReset();
  }
  function handleRemoveThumbnail() {
    setThumbnail({ url: book.image, file: null });
  }
  function handleRemovePdf() {
    setPdf({
      url: book.link,
      file: null,
      key: book.key,
      requirePassword: false,
    });
    formik.setFieldValue("key", book.key);
  }
  function handleUseThumbnailFormPdf() {
    if (pdf.file) {
      setThumbnail({ url: "", file: "" });
      formik.setFieldValue("image", "");
    }
  }
  function handleUnUseThumbnailFormPdf() {
    setThumbnail({ url: book.image, file: "" });
    formik.setFieldValue("image", book.image);
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
    fetchAllTags();
  }, []);
  async function getThumbnailAndPdf() {
    setThumbnail({ url: book.image, file: null });
    setPdf({
      url: book.link,
      key: book.key,
      file: null,
      requirePassword: false,
    });
  }
  React.useEffect(() => {
    getThumbnailAndPdf();
  }, [book]);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow && setShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setShow]);
  return (
    <PopUpModal show={show}>
      <div
        ref={ref}
        className={"bee-card modify-book-container " + props.className}
      >
        <div className="bee-card-header bg-green-50">
          <h3 className="bee-card-title">SỬA ĐỔI THÔNG TIN SÁCH</h3>
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
                      {thumbnail.file && book.image && (
                        <button
                          className="cancel-g-btn bee-btn red"
                          onClick={handleRemoveThumbnail}
                        >
                          Xóa thay đổi
                        </button>
                      )}
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
                      {pdf.file && book.link && (
                        <button
                          className="cancel-g-btn bee-btn red"
                          onClick={handleRemovePdf}
                        >
                          Xóa thay đổi
                        </button>
                      )}
                      {pdf.file &&
                        (thumbnail.url !== "" || formik.values.image !== "" ? (
                          <button
                            className="cancel-g-btn bee-btn blue"
                            onClick={handleUseThumbnailFormPdf}
                          >
                            Sử dụng bìa từ file Sách
                          </button>
                        ) : (
                          <button
                            className="cancel-g-btn bee-btn red"
                            onClick={handleUnUseThumbnailFormPdf}
                          >
                            Hủy tách bìa (phục hồi)
                          </button>
                        ))}
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
                    value={formik.values.tags}
                    setValue={(values) => formik.setFieldValue("tags", values)}
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
              KHÔI PHỤC LẠI
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

export default BookModifyPopup;
