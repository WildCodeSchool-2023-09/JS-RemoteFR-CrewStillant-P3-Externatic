const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getAdmin = await tables.admin.readAll();
    if (getAdmin) {
      res.status(200).json(getAdmin);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
};

// GET BY ID

const read = async (req, res, next) => {
  const { sub } = req.auth;
  try {
    const user = await tables.user.read(parseInt(sub, 10));
    const getAdmin = await tables.admin.read(parseInt(sub, 10));
    if (user[0] && getAdmin[0]) {
      res.status(200).json([user[0], getAdmin[0]]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { firstname, lastname, dateOfBirth } = req.body;
  const { sub } = req.auth;
  try {
    const editAdmin = await tables.admin.update(
      firstname,
      lastname,
      dateOfBirth,
      parseInt(sub, 10)
    );

    if (editAdmin.length > 0) {
      res.status(200).json(editAdmin);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const { firstname, lastname, dateOfBirth, insertId: userId } = req.body;
  try {
    const insertId = await tables.admin.create(
      firstname,
      lastname,
      dateOfBirth,
      userId
    );
    if (insertId) {
      res
        .status(201)
        .json({ insertId, message: "Votre Admin a bien été créé." });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add };
