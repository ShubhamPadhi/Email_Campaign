const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const email = require("../models/emailModel");

new Worker(
  "emailQueue",
  async (job) => {
    console.log("Send email step", job.data.step);

    await email.markSent(job.id);
  },
  { connection }
);

console.log("Worker running");
