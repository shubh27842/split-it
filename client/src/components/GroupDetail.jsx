import React, { useContext, useEffect, useState } from "react";
import GroupOverview from "./GroupOverview";
import ExpenseDetail from "./ExpenseDetail";
import { useParams } from "react-router";
import axios from "axios";
import { apiEndPoint } from "../utils/api";
import CustomModal from "./Modals/CustomModal.jsx";
import { AppContext } from "../context/AppContext";
import CustomMultiSelect from "./CustomMultiSelect.jsx";
import ExpenseModal from "./Modals/ExpenseModal.jsx";
import BalanceModal from "./Modals/BalanceModal.jsx";
import SettleUpModal from "./Modals/SettleUpModal.jsx";

const GroupDetail = () => {
  const { groupId } = useParams();
  const { store } = useContext(AppContext);
  const [group, setGroup] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [settleMpdalOpen, setSettleModalOpen] = useState(false);
  const [expense, setExpense] = useState({
    expenseName: "",
    amount: 0,
    paidBy: store?.user?.id,
    participants: [],
    group: groupId,
  });
  const [expenseParticipants, setExpenseParticipants] = useState([]);
  const fetchGroup = async () => {
    try {
      const res = await axios.get(
        `${apiEndPoint}/group/getGroup?groupId=${groupId}`
      );
      setGroup(res.data.group);
      setExpenseParticipants(
        res.data.group.members.map((member) => member._id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleBalanceModal = async () => {
    setBalanceModalOpen(true);
  };

  const handleRefresh = () => {
    fetchGroup();
  };
  return (
    <div>
      <GroupOverview groupDetail={true} group={group} />
      <div className="border-2 border-gray-400 my-2 sm:my-4 p-1 sm:p-4 grid grid-cols-3 gap-2 sm:gap-6">
        <button
          onClick={() => setSettleModalOpen(true)}
          className="text-xs sm:text-base px-1 sm:px-2 py-1 sm:py-2 cursor-pointer bg-green-400 hover:bg-green-500 text-white rounded-md"
        >
          Settle up
        </button>
        <button
          onClick={() => handleBalanceModal()}
          className="text-xs sm:text-base px-1 sm:px-2 py-1 sm:py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white rounded-md"
        >
          Balances
        </button>
        <button
          onClick={() => handleModalOpen()}
          className="text-xs sm:text-base px-1 sm:px-2 py-1 sm:py-2 cursor-pointer bg-orange-400 hover:bg-orange-500 text-white rounded-md"
        >
          Add Expense
        </button>
      </div>
      {group?.expenses?.length === 0 ? (
        <div className="border-2 border-gray-400 p-1 sm:p-4 rounded-b-lg">
          <div className="text-center text-gray-400">No expenses added yet</div>
        </div>
      ) : (
        <div className="border-2 border-gray-400 p-1 sm:p-4 rounded-b-lg">
          <div className="font-medium">Febraury, 2025</div>
          {group?.expenses?.map((expense, index) => {
            return (
              <ExpenseDetail
                key={expense._id}
                index={index}
                data={expense}
                handleRefresh={handleRefresh}
              />
            );
          })}
        </div>
      )}
      <ExpenseModal
        expense={expense}
        setExpense={setExpense}
        expenseParticipants={expenseParticipants}
        setExpenseParticipants={setExpenseParticipants}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        members={group?.members}
        type="add"
        handleRefresh={handleRefresh}
      />
      {balanceModalOpen && (
        <BalanceModal
          isOpen={balanceModalOpen}
          setIsOpen={setBalanceModalOpen}
          groupId={groupId}
        />
      )}
      {settleMpdalOpen && (
        <SettleUpModal
          isOpen={settleMpdalOpen}
          setIsOpen={setSettleModalOpen}
        />
      )}
      {/* <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mt-4">Add Expense</h2>
        <form className="text-gray-800 " onSubmit={(e) => handleExpenseAdd(e)}>
          <div className="flex flex-col mt-4">
            <label htmlFor="expenseName">Expense Name:</label>
            <input
              id="expenseName"
              placeholder="Expense Name"
              type="text"
              className="focus-visible:outline-gray-400 outline-gray-400 outline-2 rounded-sm p-2 w-full bg-gray-50 "
              value={expense.expenseName}
              onChange={(e) =>
                setExpense({ ...expense, expenseName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              placeholder="Rs 0.00"
              type="number"
              className="focus-visible:outline-gray-400 outline-gray-400 outline-2 w-full rounded-sm p-2 flex-1 bg-gray-50 "
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="paidBy">Paid By:</label>
            <select
              name="paidBy"
              id="paidBy"
              className="border-2 border-gray-400 rounded-md p-2 focus-visible:outline-gray-400 outline-gray-400"
              value={expense.paidBy}
              onChange={(e) =>
                setExpense({ ...expense, paidBy: e.target.value })
              }
            >
              {group?.members?.map((member) => {
                return (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="splitAmong">Split Among</label>
            <CustomMultiSelect
              id="splitAmong"
              options={group?.members?.map((member) => ({
                value: member._id,
                label: member.name,
              }))}
              selected={expenseParticipants}
              onChange={setExpenseParticipants}
            />
          </div>
          <div className="flex justify-center my-6">
            <button
              className="text-gray-200 bg-gray-800 px-4 py-1 rounded-sm "
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </CustomModal> */}
    </div>
  );
};

export default GroupDetail;
