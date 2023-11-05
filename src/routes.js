const { authorizedUser } = require("./Middlewares/authentication");
const { createProduct } = require("./controllers/productsController");
const { createUser, login } = require("./controllers/usersController");
const multer = require("multer")();

const route = require("express").Router();

// Users routes
route.post("/users", createUser);
route.post("/login", login);

// Products routes
route.post(
  "/products",
  authorizedUser,
  multer.single("product_img"),
  createProduct
);

module.exports = route;
