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
    const groups = await Group.find({ members: req.query.userId });
    res.json(groups);
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
    group.expenses = expenses;

    res.json({ group, expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
