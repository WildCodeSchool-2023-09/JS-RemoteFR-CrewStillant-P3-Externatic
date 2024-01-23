const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getUser = await tables.user.readAll();
    if (getUser) {
      res.status(200).json(getUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// GET BY ID

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const getUserId = await tables.user.read(parseInt(id, 10));
    if (getUserId.length > 0) {
      res.status(200).json(getUserId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res) => {
  const {
    email,
    password,
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
      password,
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
    console.error(err);
  }
};

// POST

const add = async (req, res) => {
  const {
    email,
    password,
    isActive,
    contactNumber,
    smsNotificationActive,
    emailNotificationActive,
    image,
    userTypeId,
  } = req.body;
  try {
    const addUser = await tables.user.create(
      email,
      password,
      isActive,
      contactNumber,
      smsNotificationActive,
      emailNotificationActive,
      image,
      userTypeId
    );
    if (addUser) {
      res.status(201).json(addUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE

const remove = async (req, res) => {
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
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
