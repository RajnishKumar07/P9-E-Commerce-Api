const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide Product Name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide Product Price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide Product Description"],
      maxlength: [100, "Description can not be more than 100 characters"],
    },
    image: {
      type: String,
      default: "/uploads/imageNotAvailable.jpg",
    },
    category: {
      type: String,
      required: [true, "Please provide Product Category"],
      emum: ["office", "kitchen", "bedroom", "cloths"],
    },
    company: {
      type: String,
      required: [true, "Please provide Company"],
      enum: {
        values: ["ikea", "rodoster", "marcos", "EMPORIO ARMANI", "BLIVE"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#ffff"],
      required: true,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    freeShipping: {
      type: Boolean,
      required: false,
    },
    inventry: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: { rating: 5 },
});

/**
 * to delete all the review accociated with this product
 */
ProductSchema.pre("deleteOne", async function (next) {
  const Review = mongoose.model("Review");
  const projectId = this.getFilter()._id;
  await Review.deleteMany({ product: projectId });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);

/**
 * @note about virtual
 *
 * The @ref option specifies the model to which the virtual property is linked, in this case, "Reviews".

 * The @localField option specifies the field in the current schema that will be used for matching records. In this case, it uses the "_id" field of the current schema.

 * The @foreignField option specifies the field in the linked model (Reviews) that will be used for matching records. In this case, it uses the "Products" field of the linked model.

 * The @justOne option is set to false, which means multiple documents from the "Reviews" collection can be associated with a single product.

 * The @match option is used to specify additional conditions for matching the records from the linked model. In this case, it filters the reviews based on the "rating" field and only includes reviews with a rating of 5.
 */
