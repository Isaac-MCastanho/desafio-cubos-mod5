const knex = require("../../connection");

exports.findByEmail = async (email) => {
  const verifyEmail = await knex("users").where("email", email).first();
  if (!verifyEmail) return { user: null };
  return { user: verifyEmail };
};

exports.saveUser = async (user) => {
  await knex("users").insert(user);
};
