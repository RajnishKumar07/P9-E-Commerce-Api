const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-error");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const UnathorizedError = require("./unauthorized");

module.exports = {
  BadRequestError,
  NotFoundError,
  CustomAPIError,
  UnauthenticatedError,
  UnathorizedError,
};
