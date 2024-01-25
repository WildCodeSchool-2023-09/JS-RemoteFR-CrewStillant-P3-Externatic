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
  const { id } = req.params;
  try {
    const getDegreeId = await tables.degree.read(parseInt(id, 10));
    if (getDegreeId) {
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
  const { name, level, startingDate, completionDate, university, city } =
    req.body;
  const { id } = req.params;
  try {
    const editDegree = await tables.degree.update(
      name,
      level,
      startingDate,
      completionDate,
      university,
      city,
      parseInt(id, 10)
    );

    if (editDegree.length > 0) {
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
  const { id } = req.params;
  try {
    const deleteDegree = await tables.degree.delete(parseInt(id, 10));
    if (deleteDegree) {
      res
        .status(200)
        .json("Degree has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
