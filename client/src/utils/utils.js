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
  const eachShare = Number(amount / totalParticipants).toFixed(2);
  if (loggedInUser?.email === paidBy?.email) {
    return (
      <div className="text-green-600">You lent Rs {amount - eachShare}</div>
    );
  } else {
    return <div className="text-orange-600">You borrowed Rs {eachShare}</div>;
  }
};
