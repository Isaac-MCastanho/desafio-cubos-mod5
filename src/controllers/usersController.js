const bcrypt = require("bcrypt");
const { findByEmail, saveUser } = require("../repositories/usersRepository");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(400).json({ message: "name is required!" });
  if (!email) return res.status(400).json({ message: "e-mail is required!" });
  if (!password)
    return res.status(400).json({ message: "password is required!" });

  if (!!(await findByEmail(email)).user)
    return res.status(400).json({ message: "e-mail already exists!" });

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await saveUser({
      name,
      email,
      password: encryptedPassword,
    });

    return res.status(201).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Internal service error." });
  }

  return res.json();
};
