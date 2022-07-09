import React from "react";
import {
  Document,
  Page,
  PasswordResponses,
} from "react-pdf/dist/esm/entry.webpack";
import LoadingAnimationIcon from "../Icon/Animation/LoadingAnimationIcon";
import ArrowLeftIcon from "../Icon/ArrowLeft";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import "./style.scss";

function PDFViewer(props) {
  const { url, password, handleRequestPasswordAndPages, name, index, width } =
    props;
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    handleRequestPasswordAndPages(false, numPages, index);
    setNumPages(numPages);
  }
  function onDocumentLoadError(e) {
    console.log({ e });
  }
  function onPassword(callback, reason) {
    function callbackProxy(password) {
      // Cancel button handler
      if (!password) {
        handleRequestPasswordAndPages(true, null, index);
        return;
      }
      callback(password);
    }
    switch (reason) {
      case 1: {
        // const password = prompt('Enter the password to open this PDF file.');
        callbackProxy(password);
        break;
      }
      case 2: {
        handleRequestPasswordAndPages(true, null, index);
        // const password = prompt('Invalid password. Please try again.');
        // callbackProxy(password);
        break;
      }
      default:
    }
  }
  React.useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
  }, [url]);
  return (
    <div className={numPages ? "pdf-viewer" : "pdf-viewer loading"}>
      <Document
        file={url}
        loading={<LoadingAnimationIcon />}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        onPassword={onPassword}
        className={numPages ? "" : "loading"}
      >
        <Page
          width={width ? width : 247}
          className="pdf-page"
          pageNumber={pageNumber}
        />
        <div className="controllers row">
          <button
            className="bee-btn left-btn no-fill"
            disabled={pageNumber < 2}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <ArrowLeftIcon />
          </button>
          <p>
            {pageNumber}/{numPages}
          </p>
          <button
            className="bee-btn left-btn no-fill"
            disabled={pageNumber > numPages - 1}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </Document>

      {name && <p>{name}</p>}
    </div>
  );
}

export default PDFViewer;
