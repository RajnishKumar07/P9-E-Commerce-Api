const {
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

const express = require("express");
const {
  authenticateUser,
  authorizePermission,
} = require("../middlewares/auth");
const Router = express.Router();

Router.route("/")
  .get([authenticateUser, authorizePermission("admin")], getAllOrders)
  .post(authenticateUser, createOrder);

Router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);

Router.route("/:id")
  .get(authenticateUser, getSingleOrder)
  .post(authenticateUser, updateOrder);

module.exports = Router;
