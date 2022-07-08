import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import UploadIcon from "../../../../components/Icon/UploadIcon";
import PDFViewer from "../../../../components/PDFViewer";
import sleep from "../../../../utils/sleep";
import DataTable from "react-data-table-component";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";
import adminAPI from "../../../../api/adminAPI";
import { useSnackbar } from "notistack";

AddMultiBook.propTypes = {};

const columns = [
  {
    name: "STT",
    selector: (row) => row.index,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: "Tên Sách",
    selector: (row) => row.name,
    width: "150px",
    center: true,
  },
  {
    name: "Tác giả",
    selector: (row) => row.author,
    width: "100px",
    center: true,
  },
  {
    name: "Thẻ Sách",
    selector: (row) =>
      row.tags.map((item, index) => (
        <p>
          <b className={item._id !== "X" ? "V" : "X"}>{`[${
            item._id !== "X" ? "V" : "X"
          }] `}</b>
          <i>{`#${item.name}`}</i>
        </p>
      )),
    width: "300px",
  },
  {
    name: "Lời Bình",
    selector: (row) => row.quote,
    width: "150px",
  },
  {
    name: "Mô tả",
    selector: (row) => (
      <div dangerouslySetInnerHTML={{ __html: row.description }} />
    ),
    width: "200px",
  },
  {
    name: "Giá trị",
    selector: (row) => row.price,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: "Tên File Sách",
    selector: (row) => (
      <p>
        <b className={row.pdf ? "V" : "X"}>{`[${row.pdf ? "V" : "X"}] `}</b>
        {row.nameBook}
      </p>
    ),
    width: "200px",
  },
  {
    name: "Tên File Bìa Sách",
    selector: (row) => (
      <p>
        <b className={row.thumbnail ? "V" : "X"}>{`[${
          row.thumbnail ? "V" : "X"
        }] `}</b>
        {row.nameImage}
      </p>
    ),
    width: "200px",
  },
  {
    name: "Mật khẩu",
    selector: (row) => row.key,
    width: "200px",
  },
  {
    name: "Trạng thái",
    selector: (row) => row.status,
    width: "300px",
  },
];

function AddMultiBook(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [pendingBookData, setPendingBookData] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [books, setBooks] = React.useState([
    // {
    //   index: 1,
    //   name: "",
    //   nameBook: ".pdf",
    //   nameImage: ".png",
    //   key: "password",
    //   quote: "",
    //   description: "",
    //   price: 0,
    // },
  ]);
  const [message, setMessage] = React.useState();
  function handleRequestPasswordAndPages(isLocked, numPages, index) {
    let newPdfs = [...pdfs];
    if (index > -1 && index < pdfs.length) {
      newPdfs[index].isLocked = isLocked;
      newPdfs.numPages = numPages;
    }
    setPdfs([...newPdfs]);
    console.log({ newPdfs });
  }
  const [thumbnails, setThumbnails] = React.useState([]);
  const [pdfs, setPdfs] = React.useState([]);
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
  function handleReset() {
    setBooks([]);
    setPdfs([]);
    setThumbnails([]);
  }
  function handleCheckFile(_books, _pdfs, _thumbnails) {
    let newBooks = [..._books];
    let newPdfs = [..._pdfs];
    for (let index = 0; index < newBooks.length; index++) {
      let book = newBooks[index];
      const pdfIndex = newPdfs.findIndex(
        (pdf) => pdf.file.name === book.nameBook
      );
      const imageIndex = _thumbnails.findIndex(
        (thumbnail) => thumbnail.file.name === book.nameImage
      );
      if (pdfIndex >= 0) {
        book.pdf = true;
        book.pdfIndex = pdfIndex;
        newPdfs[pdfIndex].password = book.key;
      } else {
        book.pdf = false;
        book.pdfIndex = null;
      }
      if (imageIndex >= 0) {
        book.thumbnail = true;
        book.imageIndex = imageIndex;
      } else {
        book.thumbnail = false;
        book.imageIndex = imageIndex;
      }
      newBooks[index] = { ...book };
    }
    console.log({ newPdfs });
    setPdfs([...newPdfs]);
    setBooks([...newBooks]);
  }
  async function handleFileOnChange(e) {
    setPendingBookData(true);
    const reader = new FileReader();
    var result = [];
    reader.onload = function (e) {
      var csv = reader.result;
      var lines = csv.replaceAll("\r", "").split("\n");
      var headers;
      headers = lines[0].split(",");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        if (lines[i] === undefined || lines[i].trim() === "") {
          continue;
        }
        var words = lines[i].split(",");
        for (var j = 0; j < words.length; j++) {
          obj[headers[j].trim()] = words[j];
        }
        if (obj.name) {
          const listTagsName = obj.tags ? obj.tags.split("-") : [];
          let listTags = [];
          listTagsName.forEach((tagName) => {
            const tag = tags.find(
              (t) => t.name.toLowerCase() === tagName.toLowerCase().trim()
            );
            if (tag) {
              listTags.push({ _id: tag._id, name: tag.name });
            } else {
              if (tagName.trim()) {
                listTags.push({ _id: "X", name: tagName.trim() });
              }
            }
          });
          result.push({
            ...obj,
            status: "wait",
            index: i,
            pdf: false,
            thumbnail: false,
            tags: listTags,
          });
        } else {
          continue;
        }
      }
    };
    reader.readAsText(e.target.files[0]);
    await sleep(2000);
    e.target.value = null;
    handleCheckFile(result, pdfs, thumbnails);
    setPendingBookData(false);
  }
  const handleThumbnailsChange = (e) => {
    var files = e.target.files;
    console.log({ files });
    var listThumbnails = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      var url = URL.createObjectURL(file);
      listThumbnails.push({ url, file });
    }
    setThumbnails(listThumbnails);
    e.target.value = null;
    handleCheckFile(books, pdfs, listThumbnails);
    return () =>
      listThumbnails.forEach((thumbnail) => {
        URL.revokeObjectURL(thumbnail.url);
      });
  };
  const handlePdfsChange = (e) => {
    var files = e.target.files;
    var listPdfs = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      var url = URL.createObjectURL(file);
      listPdfs.push({ url, file, password: "1", isLocked: false, numPages: 0 });
    }
    setPdfs(listPdfs);
    e.target.value = null;
    handleCheckFile(books, listPdfs, thumbnails);
    return () =>
      listPdfs.forEach((pdf) => {
        URL.revokeObjectURL(pdf.url);
      });
  };
  async function handleCreateBooks() {
    setPending(true);
    enqueueSnackbar(`Bắt đầu nhập danh sách dữ liệu!`, {
      variant: "warning",
    });
    setMessage(<p>Đang upload...</p>);
    await sleep(2000);
    let uploadBooks = [...books];
    let waiting = uploadBooks.length;
    let success = 0;
    let fail = 0;
    for (let index = 0; index < uploadBooks.length; index++) {
      uploadBooks[index].status = "wait";
    }
    setBooks([...uploadBooks]);
    console.log({ uploadBooks });
    for (let index = 0; index < uploadBooks.length; index++) {
      let book = uploadBooks[index];
      var formData = new FormData();
      book.status = "uploading...";
      uploadBooks[index] = { ...book };
      setBooks([...uploadBooks]);
      setMessage(
        <p>
          Đang upload...{" "}
          <b>{Math.round(((success + fail) * 100) / uploadBooks.length)}%</b> (
          <b>{success}</b> thành công, <b>{fail}</b> thất bại,
          <b> {waiting}</b> đang chờ)
        </p>
      );
      await sleep(2000);
      book.isUploaded = true;
      if (!book.pdf) {
        book.status = "Fail - [410] Không tìm thấy file Sách\n";
        uploadBooks[index] = { ...book };
        setBooks([...uploadBooks]);
        fail++;
        waiting--;
        continue;
      }
      if (pdfs[book.pdfIndex].isLocked) {
        book.status = "Fail - [Wrong password] Sách chưa được mở khóa\n";
        uploadBooks[index] = { ...book };
        setBooks([...uploadBooks]);
        fail++;
        waiting--;
        continue;
      }
      if (book.thumbnail && thumbnails[book.imageIndex].file) {
        formData.append("thumbnail", thumbnails[book.imageIndex].file);
      }
      formData.append("pdf", pdfs[book.pdfIndex].file);

      let listIdTags = [];
      book.tags.forEach((tag) => {
        if (tag._id !== "X") {
          listIdTags.push(tag._id);
        }
      });

      if (listIdTags.length === 0) {
        book.status = "Fail - [Null Tags] Sách không chứa thẻ\n";
        uploadBooks[index] = { ...book };
        setBooks([...uploadBooks]);
        fail++;
        waiting--;
        continue;
      }
      let bookData = {
        name: book.name,
        author: book.author,
        quote: book.quote,
        description: book.description,
        price: book.price,
        key: pdfs[book.pdfIndex].password,
        tags: listIdTags,
      };
      formData.append("detail", JSON.stringify(bookData));
      const status = await postBook(formData);
      waiting--;
      switch (status) {
        case 200:
          book.status = "Success\n";
          success++;
          break;
        case 405:
          book.status = "Fail - [405] Mô tả sách trống\n";
          fail++;
          break;
        case 406:
          book.status = "Fail - [406] Tên Sách đã tồn tại\n";
          fail++;
          break;
        case 407:
          book.status = "Fail - [407] Khởi tạo bìa thất bại\n";
          fail++;
          break;
        case 408:
          book.status = "Fail - [408] Khởi tạo Intro thất bại\n";
          fail++;
          break;
        case 409:
          book.status = "Fail - [409] Mã hóa Sách thất bại\n";
          fail++;
          break;
        case 410:
          book.status = "Fail - [410] Không nhận được file Sách\n";
          fail++;
          break;
        default:
          book.status = "Fail - [500]\n";
          fail++;
          break;
      }
      uploadBooks[index] = { ...book };
      setBooks([...uploadBooks]);
    }
    setMessage(
      <p>
        Hoàn tất{" "}
        <b>{Math.round(((success + fail) * 100) / uploadBooks.length)}%</b> (
        <b>{success}</b> thành công, <b>{fail}</b> thất bại,
        <b> {waiting}</b> đang chờ)
      </p>
    );
    enqueueSnackbar(`Nhập danh sách hoàn tất!`, {
      variant: "success",
    });
    setPending(false);
  }
  async function postBook(formData) {
    return new Promise((resolve, reject) => {
      adminAPI
        .postBook(formData)
        .then((res) => {
          resolve(200);
        })
        .catch((err) => {
          resolve(err.response.status);
        });
    });
  }
  React.useEffect(() => {
    fetchAllTags();
  }, []);
  return (
    <div
      className={
        "bee-card table-data-card add-multi-book-container " + props.className
      }
    >
      <div className="bee-card-header bg-green-50">
        <h3 className="bee-card-title">NHẬP DANH SÁCH SÁCH</h3>
      </div>
      <div className="bee-card-body col">
        <div className="section col">
          <div className="section-header row">
            <p>
              <b>Bước 01/3</b> Nhập Files Sách
            </p>
            <div className="line" />
            {pdfs.length > 0 && <label>Số lượng: {pdfs.length}</label>}
            <button className="bee-btn yellow" disabled={pending}>
              <UploadIcon />
              Import PDFs
              <input
                type={"file"}
                multiple
                accept={".pdf"}
                onChange={handlePdfsChange}
                disabled={pending}
              />
            </button>
          </div>
          {pdfs.length > 0 && (
            <div className="section-content row bee-scroll">
              {pdfs.map((item, index) => (
                <PDFViewer
                  index={index}
                  url={item.url}
                  password={item.password}
                  key={index + "-" + item.password}
                  handleRequestPasswordAndPages={handleRequestPasswordAndPages}
                  name={item.file.name}
                />
              ))}
            </div>
          )}
        </div>
        <div className="section col">
          <div className="section-header row">
            <p>
              <b>Bước 02/3:</b> Nhập Files Ảnh bìa Sách
            </p>
            <div className="line" />
            {thumbnails.length > 0 && (
              <label>Số lượng: {thumbnails.length}</label>
            )}
            <button className="bee-btn yellow" disabled={pending}>
              <UploadIcon />
              Import Images
              <input
                type={"file"}
                multiple
                accept={".png,.gif,.jpg"}
                onChange={handleThumbnailsChange}
                disabled={pending}
              />
            </button>
          </div>
          {thumbnails.length > 0 && (
            <div className="section-content row bee-scroll">
              {thumbnails.map((item, index) => (
                <div className="image">
                  <div
                    style={
                      item.url ? { backgroundImage: `url("${item.url}")` } : {}
                    }
                  ></div>
                  <p>{item.file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="section col">
          <div className="section-header row">
            <p>
              <b>Bước 03/3:</b> Nhập Danh sách dữ liệu
            </p>
            <div className="line" />
            {books.length > 0 && <label>Số lượng: {books.length}</label>}
            <button className="bee-btn yellow" disabled={pending}>
              <UploadIcon />
              Import CSV
              <input
                type={"file"}
                accept={".csv"}
                onChange={handleFileOnChange}
                disabled={pending}
              />
            </button>
          </div>
          <div className="section-content row bee-scroll">
            <div className="books-table-data">
              <DataTable
                title="THÔNG TIN SÁCH"
                fixedHeader
                fixedHeaderScrollHeight="600px"
                columns={columns}
                data={books}
                pagination
                defaultSortFieldId={2}
                progressPending={pendingBookData}
                progressComponent={<LoadingAnimationIcon />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bee-card-footer border-line-top">
        <div className="left">{message}</div>
        <div className="right">
          <button
            className="bee-btn no-fill"
            onClick={handleReset}
            disabled={pending}
          >
            DỌN DẸP
          </button>
          <button
            className="bee-btn blue"
            onClick={handleCreateBooks}
            disabled={pending}
          >
            {pending ? "ĐANG TẠO..." : "TẠO MỚI"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMultiBook;
