import PropTypes from "prop-types";
import React from "react";

const Modal = ({ modalId, children }) => {
  return (
    <dialog id={modalId} className="p-1 sm:p-2 rounded-md relative">
      {children}
    </dialog>
  );
};

Modal.propTypes = {
  modalId: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
