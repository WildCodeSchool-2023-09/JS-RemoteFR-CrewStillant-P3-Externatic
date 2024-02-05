const { z } = require("zod");

const userSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string(),
});

const validateUserData = (req, res, next) => {
  const user = req.body;

  try {
    if (userSchema.parse(user)) next();
  } catch (e) {
    next(e);
  }
};

module.exports = { validateUserData };
