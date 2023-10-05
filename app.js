require("dotenv").config();
require("express-async-errors");

const express = require("express");

const app = express();
const fileUpload = require("express-fileupload");

// all other packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// Swager;
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

// database
const connectDB = require("./db/connect");

// routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

// error handeling
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 60,
  }),
);

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5000",

  }),
);
app.use(xss());
app.use(mongoSanitize());

// extra packages
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("tiny"));

app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, resp) => {
  resp.send("<h1>E-Commerce API</h1><a href=\"/api-docs\">Documentation</a>");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
