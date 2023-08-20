const { StatusCodes } = require( "http-status-codes" );
const Review = require( "../models/ReviewModel" );
const Product = require( "../models/ProductModel" );
const customError = require( "../errors" );
const checkPermissions = require( "../utils/checkPermissions" );

const createReview = async ( req, resp ) => {
  const { product: productId } = req.body;
  const { userId } = req.user;

  const isValidProduct = await Product.findOne( { _id: productId } );
  if ( !isValidProduct ) {
    throw new customError.NotFoundError( `No product with id : ${productId}` );
  }

  const isAlreadySubmitted = await Review.findOne( {
    product: productId,
    user: userId,
  } );

  if ( isAlreadySubmitted ) {
    throw new customError.BadRequestError(
      "Already submitted review for this product",
    );
  }

  req.body.user = userId;
  const review = await Review.create( req.body );
  resp.status( StatusCodes.CREATED ).json( { review } );
};

const getAllReview = async ( req, resp ) => {
  const reviews = await Review.find( {} ).populate( {
    path: "product",
    select: "name price company",
  } ); // populate is use to get information from reference table.
  resp.status( StatusCodes.OK ).json( { reviews, count: reviews.length } );
};

const getSingleReview = async ( req, resp ) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne( { _id: reviewId } ).populate( {
    path: "product",
    select: "name price company",
  } );

  if ( !review ) {
    throw new customError.NotFoundError( `No Review Found with id ${reviewId}` );
  }
  resp.status( StatusCodes.OK ).json( { review } );
};

const updateReview = async ( req, resp ) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne( { _id: reviewId } );

  if ( !review ) {
    throw new customError.BadRequestError( `No review found with id${reviewId}` );
  }

  checkPermissions( req.user, review.user );

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  resp.status( StatusCodes.OK ).json( { review } );
};

const deleteReveiw = async ( req, resp ) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne( { _id: reviewId } );
  if ( !review ) {
    throw new customError.BadRequestError(
      `No review found with id ${reviewId}`,
    );
  }
  checkPermissions( req.user, review.user );
  await Review.deleteOne( { _id: reviewId } );

  // Calculate average rating
  await Review.calculateAverageRating( review.product );
  resp.status( StatusCodes.OK ).json( { msg: "Success! review removed" } );
};

const getSingleProductReviews = async ( req, resp ) => {
  const { id: productId } = req.params;
  const reviews = await Review.find( { product: productId } );
  resp.status( StatusCodes.OK ).json( { reviews, count: reviews.length } );
};

module.exports = {
  getAllReview,
  createReview,
  getSingleReview,
  updateReview,
  deleteReveiw,
  getSingleProductReviews,
};
