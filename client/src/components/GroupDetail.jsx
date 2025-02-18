import React from "react";
import GroupOverview from "./GroupOverview";
import ExpenseDetail from "./ExpenseDetail";

const GroupDetail = () => {
  return (
    <div>
      <GroupOverview groupDetail={true} />
      <div className="border-2 border-gray-400 my-2 sm:my-4 p-1 sm:p-4 grid grid-cols-3 gap-2 sm:gap-6">
        <button className="text-xs sm:text-base px-1 sm:px-2 py-1 sm:py-2 cursor-pointer bg-green-400 hover:bg-green-500 text-white rounded-md">
          Settle up
        </button>
        <button className="text-xs sm:text-base px-1 sm:px-2 py-1 sm:py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white rounded-md">
          Balances
        </button>
        <button className="text-xs sm:text-base px-1 sm:px-2 py-1 sm:py-2 cursor-pointer bg-orange-400 hover:bg-orange-500 text-white rounded-md">
          Add Expense
        </button>
      </div>
      <div className="border-2 border-gray-400 p-1 sm:p-4 rounded-b-lg">
        <div className="font-medium">Febraury, 2025</div>
        <ExpenseDetail index={0} lent={true} />
        <ExpenseDetail index={1} />
        <ExpenseDetail index={2} />
        <ExpenseDetail index={3} lent={true} />
      </div>
    </div>
  );
};

export default GroupDetail;
