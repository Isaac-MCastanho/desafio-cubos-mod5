const { authorizedUser } = require("./Middlewares/authentication");
const { createOrdered } = require("./controllers/orderedController");
const {
  createProduct,
  listProducts,
  getProductById,
  deleteProduct,
} = require("./controllers/productsController");
const { createUser, login } = require("./controllers/usersController");
const multer = require("multer")();

const route = require("express").Router();

// Users routes
route.post("/users", createUser);
route.post("/login", login);

route.use(authorizedUser);
// Products routes
route.post("/products", multer.single("product_img"), createProduct);
route.get("/products", listProducts);
route.get("/products/:id", getProductById);
route.delete("/products/:id", deleteProduct);

// Ordered routes
route.post("/ordered", createOrdered);

module.exports = route;
