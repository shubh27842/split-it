import React from "react";
import CustomModal from "./CustomModal";

const SettleUpModal = ({ isOpen, setIsOpen }) => {
  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-2">
        <h2 className="text-xl font-semibold">Settle Payments</h2>
      </div>
    </CustomModal>
  );
};

export default SettleUpModal;
