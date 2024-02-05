const { z } = require("zod");

const userSchema = z.object({
  lastname: z.string().min(3).max(255),
  firstname: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string(),
  date_of_birth: z.date(),
  wanted_salary: z.number().int().positive(),
  contact_number: z.string().min(10).max(15),
  sms_notification_active: z.boolean(),
  email_notification_active: z.boolean(),
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
