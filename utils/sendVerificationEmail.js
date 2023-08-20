const sendEmai = require( "./sendEmail" );

const sendVerificationEmail = async ( {
  name, email, verificationToken, origin,
} ) => {
  const verifyEmailUrl = `${origin}/user/verify-token?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link : <a href="${verifyEmailUrl}">Verify Email</a></p>`;
  return sendEmai( { to: email, subject: "Email Confirmation", html: ` <h4>Hello,${name}</h4>${message}` } );
};

module.exports = sendVerificationEmail;
