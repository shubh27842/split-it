const Expense = require("../models/Expense");
const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
  try {
    const { groupName, members, groupOwner } = req.body;
    const group = new Group({ groupName, members, groupOwner });
    await group.save();
    res.status(201).json({ message: "Group Created Successfully", group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("members");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroupsByUser = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.query.userId }).populate([
        {
            path: "groupOwner",
            select: "name email",
        },
        {
            path: "members",
            select: "name email",
        }
    ]);
    const modifiedGroups = await Promise.all(groups.map(async (group) => {
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
          if (expense.paidBy._id.equals(req.user._id)) {
            netBalance += expense.amount - eachShare;
          } else {
            netBalance -= eachShare;
          }
        });
        return{
            ...group.toObject(),
            netBalance: Number(netBalance).toFixed(2),
            balance: calculateOweDetailsForMember(expenses, req.query.userId, group.members),
        };
    }));
    res.status(200).json({success: true, groups: modifiedGroups});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMemberToGroup = async (req, res) => {
  try {
    const { groupId, membersToAdd } = req.body;
    const group = await Group.findById(groupId).populate("members");
    if (!group) return res.status(404).json({ message: "Group not found" });
    group.members.push(...membersToAdd);
    await group.save();
    res.json({ message: "Members added successfully", group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { groupId, members } = req.body;
    const group = await Group.findById(groupId).populate("members");
    group.members = members;
    await group.save();
    res.json({ message: "Group updated successfully...", group });
  } catch (err) {
    res.status(5000).json({ error: err.message });
  }
}; 

exports.deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.query.groupId).populate({
      path: "members",
      select: "name email",
    });

    if (!group) return res.status(404).json({ message: "Group not found" });
    const expenses = await Expense.find({ group: req.query.groupId })
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
      if (expense.paidBy._id.equals(req.user._id)) {
        netBalance += expense.amount - eachShare;
      } else {
        netBalance -= eachShare;
      }
    });

    res.status(200).json({
      success: true,
      group: {
        ...group.toObject(),
        expenses,
        netBalance: Number(netBalance).toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenseSummaryByGroup = async (req, res) => {
  try {
    const { groupId } = req.query;
    const group = await Group.findById(groupId).populate({
      path: "members",
      select: "name email",
    });

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    const expenses = await Expense.find({ group: groupId })
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
    let balances = {};
    group.members.forEach((member) => {
      balances[member._id] = calculateOweDetailsForMember(expenses, member._id, group.members);
    });

    res.status(200).json({
      success: true,
      balances,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const calculateOweDetailsForMember = (expenses, memberId, grpMembers) => {
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
        const splitAmount = expense.amount / expense.participants.length;

        // Add amount to payer
        balances[expense.paidBy._id].netBalance += expense.amount;
  
        // Subtract amount from each member who owes
        expense.participants.forEach((member) => {
          balances[member._id].netBalance -= splitAmount;
          balances[expense.paidBy._id].oweDetails = balances[expense.paidBy._id].oweDetails.map((owe) => {
              if(owe._id.equals(member._id)){
                  return { ...owe, amount: owe.amount + splitAmount }
              }
              return owe;
          })
          balances[member._id].oweDetails = balances[member._id].oweDetails.map((owe) => {
              if(owe._id.equals(expense.paidBy._id)){
                  return { ...owe, amount: owe.amount - splitAmount }
              }
              return owe;
          })
          });
    });
    
    return balances[memberId];
}