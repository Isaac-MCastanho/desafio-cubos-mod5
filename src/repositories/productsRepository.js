const knex = require("../infra/database/connection");

exports.saveProduct = async (product) => {
  return (await knex("products").insert(product).returning("*"))[0];
};

exports.findById = async (id) => {
  const verifyId = await knex("products").where("id", id).first();
  if (!verifyId) return { product: null };
  return { product: verifyId };
};

exports.findByAll = async () => {
  return await knex("products");
};

exports.deleteById = async (id) => {
  return await knex("products").delete().where("id", id);
};
