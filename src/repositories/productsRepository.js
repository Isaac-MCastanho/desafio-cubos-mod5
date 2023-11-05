const knex = require("../../connection");

exports.saveProduct = async (product) => {
  return (await knex("products").insert(product).returning("*"))[0];
};
