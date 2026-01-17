const email = require("../models/emailModel");
const camp = require("../models/campaignModel");

let timers = {};

exports.schedule = (campaignId) => {
  function job(step, delay) {
    timers[`${campaignId}-${step}`] = setTimeout(async () => {
      const active = await camp.isActive(campaignId);
      if (!active) return;

      console.log("Send email step", step);

      await email.markSent(step);
    }, delay);
  }

  job(1, 1000); // now
  job(2, 3 * 24 * 60 * 60 * 1000); // 3 days
  job(3, 7 * 24 * 60 * 60 * 1000); // 7 days
};

exports.cancel = (campaignId) => {
  Object.keys(timers).forEach((k) => {
    if (k.startsWith(campaignId)) clearTimeout(timers[k]);
  });
};
