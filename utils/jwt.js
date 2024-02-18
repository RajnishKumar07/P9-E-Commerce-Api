const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  let cookieConfig = {};
  // if (process.env.NODE_ENV === "production") {
  //   cookieConfig = {
  //     httpOnly: true,
  //     expires: new Date(Date.now() + oneDay),
  //     secure: true,
  //     signed: true,
  //     SameSite: "None",
  //   };
  // } else {
  //   cookieConfig = {
  //     httpOnly: true,
  //     domain: "localhost",
  //     expires: new Date(Date.now() + oneDay),
  //     secure: false,
  //     sameSite: "lax",
  //     signed: true,
  //   };
  // }
  cookieConfig = {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
    signed: true,
    SameSite: "none",
    path: "/",
  };
  res.cookie("token", token, cookieConfig);
};
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
