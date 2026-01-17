// webhookRoutes.js
const r = require("express").Router();
r.post("/reply", require("../controllers/webhookController").reply);
module.exports = r;
