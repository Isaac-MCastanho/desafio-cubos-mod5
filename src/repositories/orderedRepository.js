const knex = require("../infra/database/connection");

exports.saveOrdered = async (ordered) => {
  return (await knex("ordered").insert(ordered).returning("*"))[0];
};

exports.saveOrderedProducts = async (order_products) => {
  return (
    await knex("order_products").insert(order_products).returning("*")
  )[0];
};

exports.findOrderedByAll = async () => {
  return await knex("ordered");
};
exports.findOrderProductsByOrdered = async (ordered_id) => {
  return await knex("order_products").where("ordered_id", ordered_id);
};
