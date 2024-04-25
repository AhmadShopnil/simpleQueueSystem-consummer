const { Worker } = require("bullmq");

async function mockSendEmail(payload) {
  const { from, to, subject, body } = payload;
  return new Promise((resolve, reject) => {
    console.log(`Sending Email to ${to}....`);
    setTimeout(() => resolve(1), 5 * 1000);
  });
}

const emailWorker = new Worker(
  "email-worker",
  async (job) => {
    const data = job.data;
    console.log("receive job-", job.id);

    mockSendEmail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  },
  {
    connection: {
      host: "",
      port: 11,
      username: "default",
      password: "",
    },
  }
);

module.exports = emailWorker;
