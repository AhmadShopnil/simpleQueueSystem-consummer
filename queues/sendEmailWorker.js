const { Worker } = require("bullmq");

async function mockSendEmail(payload) {
  const { from, to, subject, body } = payload;
  return new Promise((resolve, reject) => {
    console.log(`Sending Email to ${to}....`);
    setTimeout(() => resolve(1), 2 * 1000);
  });
}

const sendEmailWorker = new Worker(
  "email-queue",
  async (job) => {
    const data = job.data;
    console.log("Job Rec.. ", job.id);

    await mockSendEmail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  },
  {
    connection: {
      host: "",
      port: 114,
      username: "",
      password: "",
    },
    limiter: {
      max: 50,
      duration: 10 * 1000,
    },
  }
);

module.exports = sendEmailWorker;
