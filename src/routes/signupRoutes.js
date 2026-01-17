// signupRoutes.js
const r = require("express").Router();
r.post("/signup", require("../controllers/signupController").signup);
module.exports = r;
