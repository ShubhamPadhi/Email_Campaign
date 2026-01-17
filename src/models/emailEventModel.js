const db = require("../config/db");

exports.addEvent = async (emailId, type, payload) => {
  await db.query(
    `INSERT INTO email_events
     (campaign_email_id,event_type,payload)
     VALUES (?,?,?)`,
    [emailId, type, JSON.stringify(payload)]
  );
};
