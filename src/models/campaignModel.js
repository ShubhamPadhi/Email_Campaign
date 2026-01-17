const db = require("../config/db");

exports.createCampaign = async (userId) => {
  const [r] = await db.query(
    "INSERT INTO campaigns(user_id,status) VALUES(?, 'ACTIVE')",
    [userId]
  );
  return r.insertId;
};

exports.stopByEmailId = async (emailId) => {
  await db.query(
    `
    UPDATE campaigns c
    JOIN campaign_emails e ON e.campaign_id=c.id
    SET c.status='STOPPED'
    WHERE e.id=?`,
    [emailId]
  );
};
exports.isActive = async (id) => {
  const [r] = await db.query("SELECT status FROM campaigns WHERE id=?", [id]);
  return r[0]?.status === "ACTIVE";
};
