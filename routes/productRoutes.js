const express = require("express");
const Router = express.Router();

const {
  authenticateUser,
  authorizePermission,
} = require("../middlewares/auth");

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} = require("../controllers/productController");

const { getSingleProductReviews } = require("../controllers/reviewController");

Router.route("/")
  .post([authenticateUser, authorizePermission("admin")], createProduct)
  .get(getAllProducts);

Router.route("/uploadImage").post(
  [authenticateUser, authorizePermission("admin")],
  uploadImage
);

Router.route("/:id")
  .get(getSingleProduct)
  .post([authenticateUser, authorizePermission("admin")], updateProduct)
  .delete([authenticateUser, authorizePermission("admin")], deleteProduct);

Router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = Router;
