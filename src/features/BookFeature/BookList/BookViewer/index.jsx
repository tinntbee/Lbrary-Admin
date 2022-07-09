import React from "react";
import PDFViewer from "../../../../components/PDFViewer";
import PopUpModal from "../../../../components/PopUpModal";
import "./style.scss";

function BookViewer(props) {
  const ref = React.useRef();
  const { pdf, show, setShow } = props;
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
      <div className="container-cover" ref={ref}>
        <PDFViewer
          url={pdf.url}
          password={pdf.password}
          width={500}
          handleRequestPasswordAndPages={() => {}}
        />
      </div>
    </PopUpModal>
  );
}

export default BookViewer;
