const express = require( "express" );
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require( "../controllers/userControllers" );

const {
  authenticateUser,
  authorizePermission,
} = require( "../middlewares/auth" );

const Router = express.Router();

Router.route( "/" ).get(
  authenticateUser,
  authorizePermission( "admin" ), // can pass the role which has access to this route. eg:authorizePermission("admin","owner")
  getAllUsers,
);

Router.route( "/showMe" ).get( authenticateUser, showCurrentUser );
Router.route( "/updateUser" ).post( authenticateUser, updateUser );
Router.route( "/updateUserPassword" ).post( authenticateUser, updateUserPassword );

Router.route( "/:id" ).get( authenticateUser, getSingleUser );

module.exports = Router;
