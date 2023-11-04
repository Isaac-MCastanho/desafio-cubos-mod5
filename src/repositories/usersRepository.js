const knex = require("../../connection");

exports.findByEmail = async (email) => {
  const verifyEmail = await knex("users").where("email", email).first();
  if (!verifyEmail) return { user: null };
  return { user: verifyEmail };
};

exports.findById = async (id) => {
  const verifyId = await knex("users").where("id", id).first();
  if (!verifyId) return { user: null };
  return { user: verifyId };
};

exports.saveUser = async (user) => {
  await knex("users").insert(user);
};
