const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  console.log("sendEmail-------->", to);

  // const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  const info = await transporter.sendMail({
    from: `"E-Commerce" <${process.env.AUTH_VERIFICATION_EMAIL}>`, // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
