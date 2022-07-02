import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

PopUpModal.propTypes = {};

function PopUpModal(props) {
  const { show } = props;
  return (
    <div
      className={
        show ? "pop-up-modal-container show" : "pop-up-modal-container show out"
      }
    >
      <div className="modal-background bee-scroll">
        <div className="bee-modal">{props.children}</div>
      </div>
    </div>
  );
}

export default PopUpModal;
