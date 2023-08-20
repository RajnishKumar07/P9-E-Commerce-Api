const mongoose = require( "mongoose" );

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [ true, "Please provide rating" ],
    },
    title: {
      type: String,
      trim: true,
      required: [ true, "Please provide review title" ],
      maxlength: [ 100, "review title can not be more than 100 characters" ],
    },
    comment: {
      type: String,
      required: [ true, "Please provide review text" ],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * using static instead of method so that we can access it from schema instead of instance of schema
 */
ReviewSchema.statics.calculateAverageRating = async function ( productId ) {
  const result = await this.aggregate( [
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ] );

  try {
    await this.model( "Product" ).findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil( result[0]?.averageRating || 0 ),
        numOfReviews: result[0]?.numOfReviews || 0,
      },
    );
  } catch ( error ) {
    console.log( error );
  }
};

ReviewSchema.post( "save", async function () {
  // we need to call this method using constructor because we use static
  await this.constructor.calculateAverageRating( this.product );
} );

// bcz of this each user can give only one review on one product
ReviewSchema.index( { user: 1 }, { product: 1 }, { unique: true } );
module.exports = mongoose.model( "Review", ReviewSchema );
