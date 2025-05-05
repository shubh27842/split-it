const Expense = require("../models/Expense");
const Group = require("../models/Group");
const Settlement = require("../models/Settlement");
const {
  getAllGroupDetailsByUser,
  calculateOweDetailsForMember,
} = require("../service/groupService");

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
    const modifiedGroups = await getAllGroupDetailsByUser(req.query.userId);
    res.status(200).json({ success: true, groups: modifiedGroups });
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

    const settlements = await Settlement.find({ groupId: req.query.groupId })
      .populate([
        {
          path: "from",
          select: "name email",
        },
        {
          path: "to",
          select: "name email",
        },
      ])
      .sort({ settledAt: -1 });
    settlements?.forEach((settle) => {
      const amount = settle.amount;
      if (settle.to.equals(req.user._id)) {
        netBalance -= amount;
      }
    });

    res.status(200).json({
      success: true,
      group: {
        ...group.toObject(),
        expenses,
        settlements,
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
    const settlements = await Settlement.find({ groupId });
    let balances = {};
    group.members.forEach((member) => {
      balances[member._id] = calculateOweDetailsForMember(
        expenses,
        member._id,
        group.members,
        settlements
      );
    });

    res.status(200).json({
      success: true,
      balances,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOweDetailsForMember = async (req, res) => {
  try {
    const { groupId, memberId } = req.query;
    if (!groupId) return res.status(400).json({ message: "Request Invalid" });
    const group = await Group.findById(groupId).populate({
      path: "members",
      select: "name email",
    });
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

    let netBalance = 0;
    expenses?.forEach((expense) => {
      const eachShare = Number(
        Number(expense.amount / expense.participants.length).toFixed(2)
      );
      if (expense.paidBy._id.equals(memberId)) {
        netBalance += expense.amount - eachShare;
      } else {
        netBalance -= eachShare;
      }
    });

    const settlements = await Settlement.find({ groupId });

    settlements?.forEach((settle) => {
      const amount = settle.amount;
      if (settle.to.equals(req.user._id)) {
        netBalance -= amount;
      }
    });

    res.status(200).json({
      success: true,
      netBalance: Number(netBalance).toFixed(2),
      balance: calculateOweDetailsForMember(
        expenses,
        memberId,
        group?.members,
        settlements
      ),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const groups = await Group.find({ members: userId }).populate(
      "members",
      "name email"
    );
    let totalOwe = 0;
    let totalOwed = 0;
    let overallBalance = 0;
    const groupWise = [];
    const friendMap = {};
    const modifiedGroups = await getAllGroupDetailsByUser(userId);

    modifiedGroups.forEach((group) => {
      const grpObj = {
        groupId: group._id,
        groupName: group.groupName,
        balance: Number(group.netBalance),
      };
      groupWise.push(grpObj);
      if (Number(group.netBalance) > 0) {
        totalOwed += Number(group.netBalance);
      } else {
        totalOwe += Math.abs(Number(group.netBalance));
      }
      group.balance.oweDetails.map((owe) => {
        const memberId = owe._id.toString();
        if (!friendMap[memberId]) {
          friendMap[memberId] = {
            name: owe.name,
            email: owe.email,
            owe: 0,
            owed: 0,
            groupOwe: {},
          };
        }
        if (owe.amount > 0) {
          friendMap[memberId].owe += Number(owe.amount);
          if (!friendMap[memberId].groupOwe[group._id]) {
            friendMap[memberId].groupOwe[group._id] = {
              groupName: group.groupName,
              oweAmount: Number(owe.amount),
            };
          } else {
            friendMap[memberId].groupOwe[group._id].oweAmount += Number(
              owe.amount
            );
          }
        } else {
          friendMap[memberId].owed += Math.abs(Number(owe.amount));
          if (!friendMap[memberId].groupOwe[group._id]) {
            friendMap[memberId].groupOwe[group._id] = {
              groupName: group.groupName,
              owedAmount: Math.abs(Number(owe.amount)),
            };
          } else {
            friendMap[memberId].groupOwe[group._id].owedAmount += Math.abs(
              Number(owe.amount)
            );
          }
        }
      });
    });
    res.status(200).json({
      success: true,
      data: {
        overallBalance: Number(Number(totalOwed - totalOwe).toFixed(2)),
        totalOwe,
        totalOwed,
        groupWise,
        friendWise: friendMap,
        // friendWise
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
