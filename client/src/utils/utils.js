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
