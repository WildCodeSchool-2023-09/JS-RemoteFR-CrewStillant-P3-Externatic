const { z } = require("zod");

const userSchema = z.object({
  lastname: z.string().min(3).max(255),
  firstname: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string(),
  dateOfBirth: z.string(),
  salary: z.string(),
  contactNumber: z.string().min(10).max(15),
  city: z.string().min(3).max(255),
  country: z.string().min(3).max(255),
  smsNotificationActive: z.boolean(),
  emailNotificationActive: z.boolean(),
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
