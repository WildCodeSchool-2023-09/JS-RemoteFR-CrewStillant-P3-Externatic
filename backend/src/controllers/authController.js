const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await tables.user.readByEmail(email);

    if (user == null) {
      res.status(404).json({
        message: "E-mail inconnu",
      });
      return;
    }

    const verified = await argon2.verify(user.password, password);

    if (verified) {
      delete user.password;

      const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "3h",
      });

      res.json({
        token,
        user,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
