const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const User = require("../models/UserModel");
const customError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils");

const register = async (req, resp) => {
  const { email, name, password } = req.body;
  const emailAlreadyExist = await User.findOne({ email });

  if (emailAlreadyExist) {
    throw new customError.BadRequestError("Email Already exist.");
  }

  // first account registered as admin
  const isFirstAccound = (await User.countDocuments({})) === 0;
  const role = isFirstAccound ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    email,
    name,
    password,
    role,
    verificationToken,
  });

  /**
   * req.get('origin')//if proxy is used then it will be proxy origin
   * req.get('protocol') //http
   * req.get('host')//localhost:5000 //with proxy
   * req.get('x-forwarded-host')//localhost:3000
   * req.get('x-forwarded-proto')://http
   *
   * if you are using postman then this all will be null
   */
  // const forwardedProtocol = req.get("x-forwarded-proto");
  // const forwardedHost = req.get("x-forwarded-host");
  // const origin =
  //   forwardedProtocol && forwardedHost
  //     ? `${forwardedProtocol}://${forwardedHost}`
  //     : "http:localhost:5000";

  const origin = req.get("origin");

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  // const tokenUser = createTokenUser( user );
  // //   const token = createJWT({ payload: tokenUser });
  // attachCookiesToResponse( { res: resp, user: tokenUser } );

  // resp.status( StatusCodes.CREATED ).json( { user: tokenUser } );

  resp.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
  });
};

const verifyEmail = async (req, resp) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError.UnauthenticatedError("Verification Failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new customError.UnauthenticatedError("Verification Failed");
  }

  user.isVerified = true;
  user.verificationToken = "";
  user.verify = Date.now();

  await user.save();

  resp.status(StatusCodes.OK).json({
    msg: "Email verified",
  });
};

const login = async (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new customError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new customError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new customError.UnauthenticatedError("Please verify your email");
  }
  const tokenUser = createTokenUser(user);
  //   const token = createJWT({ payload: tokenUser });
  attachCookiesToResponse({ res: resp, user: tokenUser });

  resp.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, resp) => {
  resp.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  resp.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgetPassword = async (req, resp) => {
  const { email } = req.body;
  if (!email) {
    throw new customError.BadRequestError("Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // const forwardedProtocol = req.get("x-forwarded-proto");
    // const forwardedHost = req.get("x-forwarded-host");
    // const origin =
    //   forwardedProtocol && forwardedHost
    //     ? `${forwardedProtocol}://${forwardedHost}`
    //     : "http:localhost:5000";

    const origin = req.get("origin");
    await sendResetPasswordEmail({
      email: user.email,
      name: user.name,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  resp
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, resp) => {
  const { email, token, password } = req.body;
  if (!email && !token && !password) {
    throw new customError.BadRequestError("Please provide all value");
  }
  const user = await User.findOne({ email });
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === token &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
    if (user.passwordToken !== token) {
      throw new customError.BadRequestError("Please provide valid token");
    }
    if (user.passwordTokenExpirationDate <= currentDate) {
      throw new customError.BadRequestError("Token has been expired");
    }

    resp.status(StatusCodes.OK).json({ msg: "Password reset successfully" });
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgetPassword,
  resetPassword,
};
