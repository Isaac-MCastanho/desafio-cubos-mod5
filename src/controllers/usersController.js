const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "e-mail is required!" });
  if (!password)
    return res.status(400).json({ message: "password is required!" });

  try {
    const user = (await findByEmail(email)).user;
    if (!user) return res.status(404).json("Incorrect email and/or password.");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(404).json("Incorrect email and/or password.");
    console.log(process.env.PASSWORD_JWT);

    const token = jwt.sign({ id: user.id }, process.env.PASSWORD_JWT, {
      expiresIn: "8h",
    });

    delete user.password;

    const userAndToken = {
      user,
      token,
    };

    return res.status(200).json(userAndToken);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Internal service error." });
  }
};
