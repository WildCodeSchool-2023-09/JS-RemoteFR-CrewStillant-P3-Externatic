const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hash = async (req, res, next) => {
  try {
    if (req.body?.newPassword) {
      const hashed = await argon2.hash(req.body.newPassword, hashingOptions);
      req.body.hashedPassword = hashed;
      delete req.body.newPassword;
    } else {
      const hashed = await argon2.hash(req.body.password, hashingOptions);
      req.body.hashedPassword = hashed;
      delete req.body.password;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err);

    res.sendStatus(401);
  }
};

module.exports = { hash, verifyToken };
