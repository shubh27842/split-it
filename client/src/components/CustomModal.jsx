import React, { useEffect } from "react";
// import PropTypes from "prop-types";

const CustomModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800/50">
      <div className="bg-white py-4 px-8 rounded-2xl shadow-lg max-w-lg w-full mx-4 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
        >
          &times;
        </button>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

// CustomModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

export default CustomModal;
