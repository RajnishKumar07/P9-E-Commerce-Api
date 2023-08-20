const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserModel");
const customError = require("../errors");

const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, resp) => {
  //   const allUsers = await User.find({ role: "user" }, { password: 0 });// this is what i have learn from other source
  const allUsers = await User.find({ role: "user" }).select("-password");
  resp.status(StatusCodes.OK).json({ users: allUsers });
};

const getSingleUser = async (req, resp) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new customError.NotFoundError(`No User found with id ${userId}`);
  }
  checkPermissions(req.user, user._id);

  resp.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, resp) => {
  resp.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, resp) => {
  const { name, email } = req.body;
  if (!email || !name) {
    throw new customError.BadRequestError("Please provide all values");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res: resp, user: tokenUser });

  resp.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, resp) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new customError.BadRequestError(
      "Please provide old password and new password"
    );
  }
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  const isPasswordMatch = user.comparePassword(oldPassword);
  if (!isPasswordMatch) {
    throw new customError.UnauthenticatedError("Invalid credentails");
  }
  user.password = newPassword;
  await user.save();

  resp.status(StatusCodes.OK).json({ msg: "Success! Password Updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
