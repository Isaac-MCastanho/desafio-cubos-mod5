const knex = require("../infra/database/connection");

exports.saveProduct = async (product) => {
  return (await knex("products").insert(product).returning("*"))[0];
};
exports.findByAll = async () => {
  return await knex("products");
};
