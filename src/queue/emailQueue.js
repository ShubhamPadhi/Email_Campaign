const { emailQueue } = require("../config/redis");
const email = require("../models/emailModel");

exports.scheduleEmails = async (campaignId) => {
  await emailQueue.add("email1", { campaignId, step: 1 }, { delay: 0 });

  await emailQueue.add(
    "email2",
    { campaignId, step: 2 },
    { delay: 3 * 24 * 60 * 60 * 1000 }
  );

  await emailQueue.add(
    "email3",
    { campaignId, step: 3 },
    { delay: 7 * 24 * 60 * 60 * 1000 }
  );
};
