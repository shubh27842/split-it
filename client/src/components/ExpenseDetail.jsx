import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { borrowLentText, paidByText } from "../utils/utils";
import ExpenseModal from "./Modals/ExpenseModal";

const ExpenseDetail = ({ index, data, handleRefresh }) => {
  const { store } = useContext(AppContext);
  const [viewModal, setViewModal] = useState(false);
  const [modalType, setModalType] = useState("view");
  const [expense, setExpense] = useState(data);
  console.log("ExpenseDetail", data);
  return data.type === "expense" ? (
    <div
      className={`grid grid-cols-5 p-1 sm:p-2 text-xs sm:text-base ${index % 2 ? "" : "bg-gray-100"}`}
    >
      <div className="">
        {dayjs(data?.createdAt?.split("T")[0]).format("DD-MMM-YYYY")}
      </div>
      <div className="font-medium">{data?.expenseName}</div>
      <div>{paidByText(store?.user, data?.paidBy, data?.amount)}</div>
      {borrowLentText(
        store?.user,
        data?.paidBy,
        data?.participants,
        data?.amount
      )}

      <div className="ml-auto flex items-center">
        <button
          className="hover:text-blue-400 text-blue-600 cursor-pointer mx-1 sm:mx-2"
          onClick={() => {
            setViewModal(true);
            setModalType("view");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 sm:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        <button
          className="hover:text-gray-400 text-gray-600 cursor-pointer mx-1 sm:mx-2"
          onClick={() => {
            setViewModal(true);
            setModalType("update");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 sm:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </div>
      <ExpenseModal
        expense={expense}
        setExpense={setExpense}
        expenseParticipants={data.participants?.map(
          (participant) => participant._id
        )}
        // setExpenseParticipants={setExpenseParticipants}
        isOpen={viewModal}
        setIsOpen={setViewModal}
        members={data.participants}
        type={modalType}
        handleRefresh={handleRefresh}
      />
    </div>
  ) : (
    <div className="indent-4 bg-gray-200 py-2 text-gray-800 text-sm">
      {data?.from?.name} paid Rs {data?.amount} to {data?.to?.name}
    </div>
  );
};

ExpenseDetail.propTypes = {
  index: PropTypes.number.isRequired,
  lent: PropTypes.bool.isRequired,
};

export default ExpenseDetail;
