import React from "react";

export const paidByText = (loggedInUser, paidBy, amount) => {
  if (loggedInUser?.email === paidBy?.email) {
    return `You paid Rs ${amount}`;
  } else {
    return `${paidBy?.name} paid Rs ${amount}`;
  }
};

export const borrowLentText = (loggedInUser, paidBy, participants, amount) => {
  const totalParticipants = participants?.length;
  const eachShare = amount / totalParticipants;
  const lent = Number(amount - eachShare).toFixed(2);
  const borrowed = Number(eachShare).toFixed(2);
  if (loggedInUser?.email === paidBy?.email) {
    return <div className="text-green-600">You lent Rs {lent}</div>;
  } else {
    return <div className="text-orange-600">You borrowed Rs {borrowed}</div>;
  }
};

export const getCombinedExpensesAndSettlements = (
  expenses = [],
  settlements = []
) => {
  const formattedExpenses = expenses?.map((expense) => ({
    ...expense,
    type: "expense",
  }));
  const formattedSettlements = settlements?.map((settlement) => ({
    ...settlement,
    type: "settlement",
  }));
  const combined = [...formattedExpenses, ...formattedSettlements];
  const res = combined.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  console.log("RECEIVED EXPENSES", res);
  return res;
};
