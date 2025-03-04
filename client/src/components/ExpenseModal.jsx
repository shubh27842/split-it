import React from "react";
import CustomModal from "./CustomModal";
import CustomMultiSelect from "./CustomMultiSelect";
import axios from "axios";
import { apiEndPoint } from "../utils/api";

const ExpenseModal = ({
  isOpen,
  setIsOpen,
  expense,
  setExpense,
  expenseParticipants,
  setExpenseParticipants,
  members,
  type,
}) => {
  const handleExpenseAdd = async (e) => {
    e.preventDefault();
    if (type === "view") {
      setIsOpen(false);
      return;
    }
    if (type === "add") {
      try {
        const res = await axios.post(`${apiEndPoint}/expense/createExpense`, {
          ...expense,
          participants: expenseParticipants,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.put(`${apiEndPoint}/expense/updateExpense`, {
          ...expense,
          expenseId: expense._id,
          participants: expenseParticipants,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    setIsOpen(false);
  };
  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2 className="text-xl font-semibold mt-4 capitalize">{type} Expense</h2>
      <form className="text-gray-800 " onSubmit={(e) => handleExpenseAdd(e)}>
        <div className="flex flex-col mt-4">
          <label htmlFor="expenseName">Expense Name:</label>
          <input
            id="expenseName"
            placeholder="Expense Name"
            type="text"
            className="focus-visible:outline-gray-400 outline-gray-400 outline-2 rounded-sm p-2 w-full bg-gray-50 "
            value={expense?.expenseName}
            onChange={(e) =>
              setExpense({ ...expense, expenseName: e.target.value })
            }
            disabled={type === "view"}
            required
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            placeholder="Rs 0.00"
            type="number"
            className="focus-visible:outline-gray-400 outline-gray-400 outline-2 w-full rounded-sm p-2 flex-1 bg-gray-50 "
            value={expense?.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            disabled={type === "view"}
            required
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="paidBy">Paid By:</label>
          <select
            name="paidBy"
            id="paidBy"
            className="border-2 border-gray-400 rounded-md p-2 focus-visible:outline-gray-400 outline-gray-400"
            value={expense?.paidBy}
            onChange={(e) => setExpense({ ...expense, paidBy: e.target.value })}
            disabled={type === "view"}
            required
          >
            {members?.map((member) => {
              return (
                <option key={member?._id} value={member?._id}>
                  {member?.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="splitAmong">Split Among</label>
          <CustomMultiSelect
            id="splitAmong"
            options={members?.map((member) => ({
              value: member?._id,
              label: member?.name,
            }))}
            selected={expenseParticipants}
            onChange={setExpenseParticipants}
            disabled={type === "view"}
          />
        </div>
        <div className="flex justify-center my-6">
          <button
            className="text-gray-200 bg-gray-800 px-4 py-1 rounded-sm cursor-pointer hover:bg-gray-900 capitalize"
            type="submit"
          >
            {type === "view" ? "Close" : type}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default ExpenseModal;
