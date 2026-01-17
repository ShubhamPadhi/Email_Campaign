const user = require("../models/userModel");
const camp = require("../models/campaignModel");
const email = require("../models/emailModel");
const scheduler = require("../scheduler/localScheduler");

exports.signup = async (req, res) => {
  const { name, email: mail, company } = req.body;

  // 1. create user
  const userId = await user.createUser(name, mail, company);

  // 2. create campaign
  const campaignId = await camp.createCampaign(userId);

  // 3. CREATE EMAIL ROWS IN DB  👇
  const now = new Date();

  await email.createEmail(campaignId, 1, now);

  await email.createEmail(
    campaignId,
    2,
    new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
  );

  await email.createEmail(
    campaignId,
    3,
    new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  );

  // 4. start local scheduler
  scheduler.schedule(campaignId);

  res.json({ message: "campaign started" });
};
