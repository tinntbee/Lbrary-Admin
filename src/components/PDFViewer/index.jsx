import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import LoadingAnimationIcon from "../Icon/Animation/LoadingAnimationIcon";
import ArrowLeftIcon from "../Icon/ArrowLeft";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import "./style.scss";

function PDFViewer(props) {
  const { url, key, password } = props;
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  let _passwordCallback;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function onPassword(callback) {
    if (password) {
      callback(password);
      return;
    }
    _passwordCallback = callback;
  }
  function enterPassword() {
    console.log("enter");
    _passwordCallback("1234");
  }
  React.useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
  }, [url]);
  React.useEffect(() => {
    if (password && _passwordCallback) {
      _passwordCallback(password);
    }
  }, [password]);
  return (
    <div className={numPages ? "pdf-viewer" : "pdf-viewer loading"}>
      <Document
        file={url}
        loading={<LoadingAnimationIcon />}
        onLoadSuccess={onDocumentLoadSuccess}
        onPassword={onPassword}
      >
        <Page width={`247`} className="pdf-page" pageNumber={pageNumber} />
      </Document>
      <div className="controllers row">
        <button
          className="bee-btn left-btn"
          disabled={pageNumber < 2}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <ArrowLeftIcon />
        </button>
        <p>
          {pageNumber}/{numPages}
        </p>
        <button
          className="bee-btn left-btn"
          disabled={pageNumber > numPages - 1}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;
