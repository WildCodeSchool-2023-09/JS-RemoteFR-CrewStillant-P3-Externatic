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

// GET BY ID

const read = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getUserId = await tables.user.read(parseInt(id, 10));
    if (getUserId.length > 0) {
      res.status(200).json(getUserId);
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
    isActive,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    image,
    userTypeId,
  } = req.body;
  const { id } = req.params;
  try {
    const editUser = await tables.user.edit(
      email,
      hashedPassword,
      isActive,
      contactNumber,
      smsNotificationActive,
      emailNotificationActive,
      image,
      userTypeId,
      parseInt(id, 10)
    );
    if (editUser.length > 0) {
      res.status(200).json(editUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res, next) => {
  const {
    email,
    hashedPassword,
    isActive = 1,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
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

// DELETE

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteUser = await tables.user.delete(parseInt(id, 10));
    if (deleteUser.length > 0) {
      res
        .status(200)
        .json("user has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, edit, add, remove };
