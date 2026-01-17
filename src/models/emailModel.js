const db = require("../config/db");

exports.createEmail = async (campaignId, step, date) => {
  await db.query(
    `INSERT INTO campaign_emails
     (campaign_id, step, scheduled_at, status)
     VALUES (?,?,?, 'PENDING')`,
    [campaignId, step, date]
  );
};

exports.markSent = async (id) => {
  await db.query(
    "UPDATE campaign_emails SET status='SENT', sent_at=NOW() WHERE id=?",
    [id]
  );
};
