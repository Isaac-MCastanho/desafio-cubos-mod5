const { createUser, login } = require("./controllers/usersController");

const route = require("express").Router();

route.post("/users", createUser);
route.post("/login", login);

module.exports = route;
