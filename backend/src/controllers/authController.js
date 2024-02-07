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

    const { id, userTypeId } = user;
    const mail = user.email;

    if (!verified) {
      res.status(422).json({
        message: "Mot de passe invalide",
      });
    } else {
      delete user.password;

      const token = await jwt.sign(
        { sub: id, role: userTypeId, email: mail },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token, userTypeId, mail });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
