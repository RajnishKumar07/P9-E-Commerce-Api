# E-Commerce API

This is an API for managing an E-Commerce platform, providing endpoints for user authentication, product management, reviews, orders, and more.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Starting the Server](#starting-the-server)
- [API Documentation](#api-documentation)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

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
   git clone https://github.com/your-username/e-commerce-api.git
   cd e-commerce-api

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

- `/api/v1/auth/register`:
  - **Method:** POST
  - **Description:** Register a new user.

- `/api/v1/auth/login`:
  - **Method:** POST
  - **Description:** Log in a user.

- `/api/v1/auth/logout`:
  - **Method:** GET
  - **Description:** Log out the currently authenticated user.

- `/api/v1/auth/verify-email`:
  - **Method:** POST
  - **Description:** Verify a user's email address.

- `/api/v1/auth/reset-password`:
  - **Method:** POST
  - **Description:** Reset a user's password.

- `/api/v1/auth/forget-password`:
  - **Method:** POST
  - **Description:** Send a password reset email to the user.

### User Routes

- `/api/v1/users`:
  - **Method:** GET
  - **Description:** Get all users (admin only).

- `/api/v1/users/showMe`:
  - **Method:** GET
  - **Description:** Get the current user's profile.

- `/api/v1/users/updateUser`:
  - **Method:** POST
  - **Description:** Update the current user's profile.

- `/api/v1/users/updateUserPassword`:
  - **Method:** POST
  - **Description:** Update the current user's password.

- `/api/v1/users/:id`:
  - **Method:** GET
  - **Description:** Get a single user by ID (admin only).

### Product Routes

- `/api/v1/products`:
  - **Method:** POST
  - **Description:** Create a new product (admin only).

- `/api/v1/products`:
  - **Method:** GET
  - **Description:** Get all products.

- `/api/v1/products/uploadImage`:
  - **Method:** POST
  - **Description:** Upload an image for a product (admin only).

- `/api/v1/products/:id`:
  - **Method:** GET
  - **Description:** Get a single product by ID.

- `/api/v1/products/:id`:
  - **Method:** POST
  - **Description:** Update a product by ID (admin only).

- `/api/v1/products/:id`:
  - **Method:** DELETE
  - **Description:** Delete a product by ID (admin only).

- `/api/v1/products/:id/reviews`:
  - **Method:** GET
  - **Description:** Get all reviews for a product.

### Review Routes

- `/api/v1/reviews`:
  - **Method:** GET
  - **Description:** Get all reviews.

- `/api/v1/reviews`:
  - **Method:** POST
  - **Description:** Create a new review.

- `/api/v1/reviews/:id`:
  - **Method:** GET
  - **Description:** Get a single review by ID.

- `/api/v1/reviews/:id`:
  - **Method:** POST
  - **Description:** Update a review by ID.

- `/api/v1/reviews/:id`:
  - **Method:** DELETE
  - **Description:** Delete a review by ID.

### Order Routes

- `/api/v1/orders`:
  - **Method:** GET
  - **Description:** Get all orders (admin only).

- `/api/v1/orders`:
  - **Method:** POST
  - **Description:** Create a new order.

- `/api/v1/orders/showAllMyOrders`:
  - **Method:** GET
  - **Description:** Get all orders for the current user.

- `/api/v1/orders/:id`:
  - **Method:** GET
  - **Description:** Get a single order by ID.

- `/api/v1/orders/:id`:
  - **Method:** POST
  - **Description:** Update an order by ID.


## Deployment

You can access the live demo of this E-Commerce API on [Render](https://your-app-name.onrender.com).

Feel free to explore the API's functionality and test its features.
