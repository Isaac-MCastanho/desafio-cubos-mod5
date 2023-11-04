const route = require("express").Router();

route.get("/hello", (req, res) => {
  return res.send("Ola amigo");
});

module.exports = route;
