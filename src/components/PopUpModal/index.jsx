import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

PopUpModal.propTypes = {};

function PopUpModal(props) {
  const { show } = props;
  const [oldShow, setOldShow] = React.useState(false);
  React.useEffect(() => {
    if (!(show || oldShow)) {
      setOldShow(false);
    } else {
      setOldShow(true);
    }
  }, [show]);
  return (
    <div
      className={
        show
          ? "pop-up-modal-container show"
          : oldShow
          ? "pop-up-modal-container show out"
          : "pop-up-modal-container"
      }
    >
      <div className="modal-background bee-scroll">
        <div className="bee-modal">{props.children}</div>
      </div>
    </div>
  );
}

export default PopUpModal;
