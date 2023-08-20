const express = require("express");
const {
  register,
  login,
  logout,
  verifyEmail,
  resetPassword,
  forgetPassword,
} = require("../controllers/authControllers");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").get(logout);
Router.route("/verify-email").post(verifyEmail);
Router.route("/reset-password").post(resetPassword);
Router.route("/forget-password").post(forgetPassword);

module.exports = Router;
