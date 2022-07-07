import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import UploadIcon from "../../../../components/Icon/UploadIcon";
import PDFViewer from "../../../../components/PDFViewer";
import sleep from "../../../../utils/sleep";
import DataTable from "react-data-table-component";
import LoadingAnimationIcon from "../../../../components/Icon/Animation/LoadingAnimationIcon";

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
    selector: (row) => `[${row.pdf ? "V" : "X"}] ` + row.nameBook,
    width: "200px",
  },
  {
    name: "Tên File Ảnh",
    selector: (row) => `[${row.thumbnail ? "V" : "X"}] ` + row.nameImage,
    width: "200px",
  },
  {
    name: "Trạng thái",
    selector: (row) => row.status,
    width: "300px",
  },
];

function AddMultiBook(props) {
  const [pending, setPending] = React.useState(false);
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
  const [message, setMessage] = React.useState(
    <p>
      Đang upload... <b>50%</b> (<b>20</b> thành công, <b>30</b> thất bại,{" "}
      <b>50</b> đang chờ){" "}
    </p>
  );
  function handleRequestPasswordAndPages(_, __, ___) {}
  const [thumbnails, setThumbnails] = React.useState([]);
  const [pdfs, setPdfs] = React.useState([]);
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
        book.filePdf = newPdfs[pdfIndex].file;
        newPdfs[pdfIndex].password = book.key;
      } else {
        book.pdf = false;
        book.filePdf = null;
      }
      if (imageIndex >= 0) {
        book.thumbnail = true;
        book.fileThumbnail = _thumbnails[imageIndex].file;
      } else {
        book.thumbnail = false;
        book.fileThumbnail = null;
      }
      newBooks[index] = { ...book };
    }
    console.log({ newPdfs });
    setPdfs([...newPdfs]);
    setBooks([...newBooks]);
  }
  async function handleFileOnChange(e) {
    setPending(true);
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
          result.push({
            ...obj,
            status: "wait",
            index: i,
            pdf: false,
            thumbnail: false,
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
    setPending(false);
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
      listPdfs.push({ url, file, password: "" });
    }
    setPdfs(listPdfs);
    e.target.value = null;
    handleCheckFile(books, listPdfs, thumbnails);
    return () =>
      listPdfs.forEach((pdf) => {
        URL.revokeObjectURL(pdf.url);
      });
  };
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
            <button className="bee-btn yellow">
              <UploadIcon />
              Import PDFs
              <input
                type={"file"}
                multiple
                accept={".pdf"}
                onChange={handlePdfsChange}
              />
            </button>
          </div>
          {pdfs.length > 0 && (
            <div className="section-content row bee-scroll">
              {pdfs.map((item, index) => (
                <PDFViewer
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
            <button className="bee-btn yellow">
              <UploadIcon />
              Import Images
              <input
                type={"file"}
                multiple
                accept={".png,.gif,.jpg"}
                onChange={handleThumbnailsChange}
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
            <button className="bee-btn yellow">
              <UploadIcon />
              Import CSV
              <input
                type={"file"}
                accept={".csv"}
                onChange={handleFileOnChange}
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
                progressPending={pending}
                progressComponent={<LoadingAnimationIcon />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bee-card-footer border-line-top">
        <div className="right">
          <button className="bee-btn no-fill" onClick={handleReset}>
            DỌN DẸP
          </button>
          <button className="bee-btn blue" onClick={() => {}}>
            TẠO MỚI
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMultiBook;
