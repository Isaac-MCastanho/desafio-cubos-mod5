const jwt = require("jsonwebtoken");
const { findById } = require("../repositories/usersRepository");

exports.authorizedUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Not authorized!" });
  }

  try {
    const { id } = jwt.verify(authorization, process.env.PASSWORD_JWT);

    const user = (await findById(id)).user;
    if (!user) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal service error." });
  }
};
