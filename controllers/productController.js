const { StatusCodes } = require( "http-status-codes" );
const path = require( "path" );
const Product = require( "../models/ProductModel" );
const customError = require( "../errors" );

const createProduct = async ( req, resp ) => {
  req.body.user = req.user.userId;
  const product = await Product.create( req.body );
  resp.status( StatusCodes.CREATED ).json( { product } );
};

const getAllProducts = async ( req, resp ) => {
  const { search, sort } = req.query;
  const queryObject = {};

  // set condition for searching
  if ( search ) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  let result = Product.find( queryObject ).populate( "reviews" ); // i can populate review because in schema using virtual

  // sorting the data
  if ( sort && sort.length > 0 ) {
    const sortOptions = {};
    const sortArray = JSON.parse( sort ); // Parse the string into an array of objects
    for ( const item of sortArray ) {
      const { key, value } = item;

      if ( key && value ) {
        sortOptions[key] = value === "asc" ? 1 : -1;
      }
    }
    result = result.sort( sortOptions );
  }

  // pagination
  const page = Number( req.query.page ) || 1;
  const limit = Number( req.query.limit ) || 10;
  const skip = ( page - 1 ) * limit;

  result = result.skip( skip ).limit( limit );

  const products = await result;
  const totalProducts = await Product.countDocuments( queryObject );
  const numOfPages = await Math.ceil( totalProducts / limit );

  resp.status( StatusCodes.OK ).json( { products, totalProducts, numOfPages } );
};

const getSingleProduct = async ( req, resp ) => {
  const { id: productId } = req.params;
  const product = await Product.findOne( { _id: productId } ).populate( "reviews" );
  if ( !product ) {
    throw new customError.NotFoundError(
      `No Product Found with id :${productId}`,
    );
  }

  resp.status( StatusCodes.OK ).json( { product } );
};

const updateProduct = async ( req, resp ) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate( { _id: productId }, req.body, {
    new: true,
    runValidators: true,
  } );
  if ( !product ) {
    throw new customError.NotFoundError(
      `No Product Found with id :${productId}`,
    );
  }
  resp.status( StatusCodes.OK ).json( { product } );
};

const deleteProduct = async ( req, resp ) => {
  const { id: productId } = req.params;
  const product = await Product.findOne( { _id: productId } );
  if ( !product ) {
    throw new customError.NotFoundError(
      `No Product Found with id :${productId}`,
    );
  }

  await Product.deleteOne( { _id: productId } );
  resp.status( StatusCodes.OK ).json( { msg: "Success! product removed" } );
};

const uploadImage = async ( req, resp ) => {
  if ( !req.files ) {
    throw new customError.BadRequestError( "No image uploaded" );
  }

  const productImage = req.files.image;
  if ( !productImage.mimetype.startsWith( "image" ) ) {
    throw new customError.BadRequestError( "Please upload Image" );
  }

  const maxSize = 1024 * 1024;
  if ( productImage.size > maxSize ) {
    throw new customError.BadRequestError( "Please upload image less than 1MB" );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`,
  );

  await productImage.mv( imagePath );
  resp.status( StatusCodes.OK ).json( { image: `/uploads/${productImage.name}` } );
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
