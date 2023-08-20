# E-Commerce API

This is an API for managing an E-Commerce platform, providing endpoints for user authentication, product management, reviews, orders, and more.

## Table of Contents

- [E-Commerce API](#e-commerce-api)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [API Documentation](#api-documentation)
  - [Routes](#routes)
    - [Authentication Routes](#authentication-routes)
    - [User Routes](#user-routes)
    - [Product Routes](#product-routes)
    - [Review Routes](#review-routes)
    - [Order Routes](#order-routes)
  - [Deployment](#deployment)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed and running
- NPM or Yarn installed
- An `.env` file with the necessary environment variables (see [Environment Variables](#environment-variables))

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/RajnishKumar07/P9-E-Commerce-Api.git
   cd P9-E-Commerce-Api

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install

3. Create a `.env` file in the root directory of your project and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URL=mongodb://localhost/e-commerce-db
   JWT_SECRET=your-secret-key
   JWT_LIFETIME=1d
   AUTH_VERIFICATION_EMAIL=your-email@gmail.com
   APP_PASSWORD=your-email-password

   Modify these values according to your setup.

4. Start the server by running:

   ```sh
   npm start
   # or
   yarn start

 The server will listen on the port specified in your `.env` file (default is 5000).

## API Documentation

You can find the API documentation by visiting the `/api-docs` route when the server is running. This will display the Swagger UI with detailed information about each API endpoint.

## Routes

### Authentication Routes

# P9 E Commerce API

This is the documentation for the P9 E Commerce API. Below you'll find details about the available endpoints, their methods, descriptions, and request body formats.

## Authentication (Auth)

| Endpoint                | Method | Description                     | Request Body                                      |
| ----------------------- | ------ | ------------------------------- | ------------------------------------------------- |
| `/api/auth/signup`      | POST   | Create a new user               | { "email": "string", "password": "string" }       |
| `/api/auth/login`       | POST   | Login with an existing user     | { "email": "string", "password": "string" }       |
| `/api/auth/logout`      | GET    | Log out the currently authenticated user |                                               |
| `/api/auth/verify-email`| POST   | Verify a user's email address   | { "verificationToken": "string", "email": "string" } |
| `/api/auth/reset-password`| POST | Reset a user's password         | { "email": "string", "token": "string", "password": "string" } |
| `/api/auth/forget-password`| POST | Send a password reset email to the user | { "email": "string" } |

## User

| Endpoint                | Method | Description                     | Request Body                                      |
| ----------------------- | ------ | ------------------------------- | ------------------------------------------------- |
| `/api/users`            | GET    | Get all users (admin only)      |                                               |
| `/api/users/{id}`       | GET    | Get a single user by ID (admin only) |                                           |
| `/api/users/showMe`     | GET    | Get the current user's profile  |                                               |
| `/api/users/updateUser` | POST   | Update the current user's profile | { "email": "string", "name": "string" }          |
| `/api/users/updateUserPassword`| POST | Update the current user's password | { "oldPassword": "string", "newPassword": "string" } |

## Product

| Endpoint                | Method | Description                     | Request Body                                      |
| ----------------------- | ------ | ------------------------------- | ------------------------------------------------- |
| `/api/products`         | GET    | Get all products                |                                               |
| `/api/products`         | POST   | Create a new product (admin only) | { "name": "string", "price": "integer", "description": "string", "image": "string", "category": "string", "company": "string", "colors": "string" } |
| `/api/products/uploadImage`| POST | Upload an image for a product (admin only) | Multipart Form-Data with `image` |
| `/api/products/{id}`    | GET    | Get a single product by ID      |                                               |
| `/api/products/{id}`    | POST   | Update a product by ID (admin only) | { "name": "string" }                             |
| `/api/products/{id}`    | DELETE | Delete a product by ID (admin only) |                                               |
| `/api/products/{id}/reviews`| GET | Get all reviews for a product |                                           |

## Review

| Endpoint                | Method | Description                     | Request Body                                      |
| ----------------------- | ------ | ------------------------------- | ------------------------------------------------- |
| `/api/reviews`          | GET    | Get all reviews                 |                                               |
| `/api/reviews`          | POST   | Create a new review             | { "product": "string", "rating": "integer", "title": "string", "comment": "string" } |
| `/api/reviews/{id}`     | GET    | Get a single review by ID       |                                               |
| `/api/reviews/{id}`     | POST   | Update a review by ID           | { "rating": "integer", "title": "string", "comment": "string" } |
| `/api/reviews/{id}`     | DELETE | Delete a review by ID           |                                               |

## Orders

| Endpoint                | Method | Description                     | Request Body                                      |
| ----------------------- | ------ | ------------------------------- | ------------------------------------------------- |
| `/api/orders`           | GET    | Get all orders (admin only)     |                                               |
| `/api/orders`           | POST   | Create a new order              | { "tax": "integer", "shippingFee": "integer", "items": [{ "name": "string", "price": "string", "image": "string", "amount": "integer", "product": "string" }] } |
| `/api/orders/showAllMyOrders`| GET | Get all orders for the current user |                                      |
| `/api/orders/{id}`      | GET    | Get a single order by ID        |                                               |
| `/api/orders/{id}`      | POST   | Update an order by ID           | { "paymentIntentId": "string" }                  |

## Security

- The API uses Bearer Token for authentication.


## Deployment

You can access the live demo of this E-Commerce API on [Render](https://e-commerce-api-yyqb.onrender.com).

Feel free to explore the API's functionality and test its features.
