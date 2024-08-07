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
    if (!req.body.password.startsWith("$argon2i$")) {
      const hashed = await argon2.hash(req.body.password, hashingOptions);
      req.body.hashedPassword = hashed;
    } else {
      req.body.hashedPassword = req.body.password;
    }

    delete req.body.password;

    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res, next) => {
  console.info(req.path);
  console.info(req.url);
  console.info(req.originalUrl);
  try {
    const authorizationHeader = req.headers.authorization || null;

    if (!authorizationHeader) {
      return res
        .status(403)
        .json({ message: "Authorization header is missing" });
    }

    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2) {
      return res
        .status(400)
        .json({ message: "Invalid Authorization header format" });
    }

    const [type, token] = parts;

    if (type !== "Bearer") {
      return res
        .status(403)
        .json({ message: "Authorization header has not the 'Bearer' type" });
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET);

    return next();
  } catch (e) {
    return next(e);
  }
};

module.exports = { hash, verifyToken };
