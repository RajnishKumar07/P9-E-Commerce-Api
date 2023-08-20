module.exports = {
  service: "gmail",
  auth: {
    user: process.env.AUTH_VERIFICATION_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
};
// for Testing with ethereal
// {
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "rosalee50@ethereal.email",
//     pass: "xdrTY3XFWUuaEDH3Hf",
//   },
// }
