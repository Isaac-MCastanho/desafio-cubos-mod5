const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
require("dotenv").config();

app.use(express.json());
app.use(routes);

app.listen(port, () =>
  console.log(`
  Server running on http://localhost:${port}/`)
);
