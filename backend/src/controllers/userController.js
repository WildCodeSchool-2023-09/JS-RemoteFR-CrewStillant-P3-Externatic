const tables = require("../tables");

// GET

const browse = async (req, res, next) => {
  try {
    const getUser = await tables.user.readAll();
    if (getUser) {
      res.status(200).json(getUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  const { sub } = req.auth;
  try {
    const user = await tables.user.read(parseInt(sub, 10));
    if (user[0]) {
      res.status(200).json(user[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const {
    email,
    hashedPassword,
    isActive = 1,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    image,
    type,
  } = req.body;
  try {
    const insertId = await tables.user.create(
      email,
      hashedPassword,
      isActive,
      contactNumber,
      smsNotificationActive ? 1 : 0,
      emailNotificationActive ? 1 : 0,
      image,
      type
    );
    if (insertId) {
      res
        .status(201)
        .json({ insertId, message: "Votre utilisateur a bien été créer." });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// PUT
const edit = async (req, res, next) => {
  const {
    email,
    hashedPassword,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    image,
  } = req.body;
  const { sub } = req.auth;
  try {
    const editUser = await tables.user.update(
      email,
      hashedPassword,
      contactNumber,
      smsNotificationActive,
      emailNotificationActive,
      image,
      parseInt(sub, 10)
    );
    if (editUser) {
      res.status(200).json(editUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { sub } = req.auth;
  try {
    const deleteUser = await tables.user.delete(parseInt(sub, 10));
    if (deleteUser) {
      res.status(200).json("User is successfully deleted");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, edit, add, remove };
