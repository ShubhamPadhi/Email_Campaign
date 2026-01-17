const event = require("../models/emailEventModel");
const camp = require("../models/campaignModel");
const scheduler = require("../scheduler/localScheduler");

exports.reply = async (req, res) => {
  const { emailId, campaignId } = req.body;

  await event.addEvent(emailId, "REPLY", req.body);

  // FIXED LINE 👇
  await camp.stopByEmailId(emailId);

  scheduler.cancel(campaignId);

  res.json({ message: "stopped" });
};
