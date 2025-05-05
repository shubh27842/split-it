const Expense = require("../models/Expense");
const Group = require("../models/Group");
const Settlement = require("../models/Settlement");

const calculateOweDetailsForMember = (
    expenses,
    memberId,
    grpMembers,
    settlements
  ) => {
    let balances = {};
    grpMembers.forEach((member) => {
      balances[member._id] = {
        name: member.name,
        email: member.email,
        netBalance: 0,
        oweDetails: grpMembers
          ?.filter((m) => !m._id.equals(member._id))
          .map((m) => ({ ...m.toObject(), amount: 0 })),
      };
    });
    expenses.forEach((expense) => {
      const splitAmount = Number(
        Number(expense.amount / expense.participants.length).toFixed(2)
      );
      // Add amount to payer
      balances[expense.paidBy._id].netBalance += expense.amount;
  
      // Subtract amount from each member who owes
      expense.participants.forEach((member) => {
        balances[member._id].netBalance -= splitAmount;
        balances[expense.paidBy._id].oweDetails = balances[
          expense.paidBy._id
        ].oweDetails.map((owe) => {
          if (owe._id.equals(member._id)) {
            return {
              ...owe,
              amount: Number(Number(owe.amount + splitAmount).toFixed(2)),
            };
          }
          return owe;
        });
        balances[member._id].oweDetails = balances[member._id].oweDetails.map(
          (owe) => {
            if (owe._id.equals(expense.paidBy._id)) {
              return {
                ...owe,
                amount: Number(Number(owe.amount - splitAmount).toFixed(2)),
              };
            }
            return owe;
          }
        );
      });
    });
  
    settlements?.forEach((settle) => {
      const { from: fromId, to: toId } = settle;
      const amount = settle.amount;
      balances[fromId].netBalance += amount;
      balances[toId].netBalance -= amount;
      balances[fromId].oweDetails = balances[fromId].oweDetails.map((owe) => {
        if (owe._id.equals(toId)) {
          return {
            ...owe,
            amount: Number(Number(owe.amount + amount).toFixed(2)),
          };
        }
        return owe;
      });
      balances[toId].oweDetails = balances[toId].oweDetails.map((owe) => {
        if (owe._id.equals(fromId)) {
          return {
            ...owe,
            amount: Number(Number(owe.amount - amount).toFixed(2)),
          };
        }
        return owe;
      });
    });
  
    return balances[memberId];
  };

const getAllGroupDetailsByUser = async (userId) => {
const groups = await Group.find({ members: userId }).populate([
      {
        path: "groupOwner",
        select: "name email",
      },
      {
        path: "members",
        select: "name email",
      },
    ]);
    const modifiedGroups = await Promise.all(
      groups.map(async (group) => {
        const expenses = await Expense.find({ group: group._id })
          .populate([
            {
              path: "paidBy",
              select: "name email",
            },
            {
              path: "participants",
              select: "name email",
            },
          ])
          .sort({ createdAt: -1 });

        let netBalance = 0;
        expenses?.forEach((expense) => {
          const eachShare = expense.amount / expense.participants.length;
          if (expense.paidBy._id.equals(userId)) {
            netBalance += expense.amount - eachShare;
          } else {
            netBalance -= eachShare;
          }
        });
        const settlements = await Settlement.find({ groupId: group._id });

        settlements?.forEach((settle) => {
          const amount = settle.amount;
          if (settle.to.equals(userId)) {
            netBalance -= amount;
          }
        });
        return {
          ...group.toObject(),
          netBalance: Number(netBalance).toFixed(2),
          balance: calculateOweDetailsForMember(
            expenses,
            userId,
            group.members,
            settlements
          ),
        };
      })
    );
    return modifiedGroups;
}

module.exports = { getAllGroupDetailsByUser, calculateOweDetailsForMember };