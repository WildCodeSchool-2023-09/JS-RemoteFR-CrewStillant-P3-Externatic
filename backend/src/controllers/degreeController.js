const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getDegree = await tables.degree.readAll();
    if (getDegree) {
      res.status(200).json(getDegree);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

const read = async (req, res) => {
  const { sub } = req.auth;
  try {
    const getDegreeId = await tables.degree.read(parseInt(sub, 10));
    if (getDegreeId.length > 0) {
      res.status(200).json(getDegreeId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { name, level, startingDate, completionDate, university, city, id } =
    req.body;
  const { sub } = req.auth;
  try {
    const editDegree = await tables.degree.update(
      name,
      level,
      startingDate,
      completionDate,
      university,
      city,
      id,
      parseInt(sub, 10)
    );

    if (editDegree.affectedRows > 0) {
      res.status(200).json(editDegree);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const { name, level, startingDate, completionDate, university, city } =
    req.body;
  try {
    const addDegree = await tables.degree.create(
      name,
      level,
      startingDate,
      completionDate,
      university,
      city
    );
    if (addDegree) {
      res.status(201).json(addDegree);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE

const remove = async (req, res) => {
  const { sub } = req.auth;
  try {
    const degree = await tables.degree.read(parseInt(sub, 10));
    if (!degree) {
      res.sendStatus(404);
    } else {
      await tables.degree.delete(parseInt(sub, 10));
      res
        .status(200)
        .json("Degree has been successfully deleted from your table");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
