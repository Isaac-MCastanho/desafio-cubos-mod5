const { createUser } = require("./controllers/usersController");

const route = require("express").Router();

route.post("/users", createUser);

module.exports = route;
