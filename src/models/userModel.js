const db = require("../config/db");

exports.createUser = async (name, email, company) => {
  const [r] = await db.query(
    "INSERT INTO users(name,email,company) VALUES(?,?,?)",
    [name, email, company]
  );
  return r.insertId;
};
