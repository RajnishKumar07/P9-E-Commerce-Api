const express = require( "express" );
const {
  getAllReview,
  createReview,
  getSingleReview,
  updateReview,
  deleteReveiw,
} = require( "../controllers/reviewController" );

const { authenticateUser } = require( "../middlewares/auth" );

const Router = express.Router();

Router.route( "/" ).get( getAllReview ).post( authenticateUser, createReview );

Router.route( "/:id" )
  .get( getSingleReview )
  .post( authenticateUser, updateReview )
  .delete( authenticateUser, deleteReveiw );

module.exports = Router;
