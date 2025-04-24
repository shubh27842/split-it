const Settlement = require("../models/Settlement");
const Group = require("../models/Group");
const User = require("../models/User");

exports.settleUp = async (req, res) => {
  try {
    const { groupId, fromUserId, toUserId, amount } = req.body;
    console.log(req.body);
    if (fromUserId === toUserId) {
      return res.status(400).json({ success: false, message: "You can't settle with yourself." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found." });
    }

    // Ensure both users are in the group
    if (
      !group.members.includes(fromUserId) ||
      !group.members.includes(toUserId)
    ) {
      return res.status(403).json({ success: false, message: "Both users must be members of the group." });
    }

    const newSettlement = await Settlement.create({
      groupId,
      from: fromUserId,
      to: toUserId,
      amount: Number(amount)
    });

    res.status(201).json({
      success: true,
      message: "Settlement recorded successfully.",
      data: newSettlement
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
