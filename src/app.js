require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

app.use("/api", require("./routes/signupRoutes"));
app.use("/webhook", require("./routes/webhookRoutes"));

app.listen(3000, () => console.log("server started"));
