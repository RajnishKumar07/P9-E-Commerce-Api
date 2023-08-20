const customError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, resp, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new customError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { user, userId, role } = isTokenValid({ token });
    req.user = { name: user, userId, role };
    next();
  } catch (error) {
    throw new customError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermission = (...roles) => {
  return (req, resp, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customError.UnathorizedError(
        "Unathorized to access this route"
      );
    }
    next();
  };
};
module.exports = { authenticateUser, authorizePermission };
