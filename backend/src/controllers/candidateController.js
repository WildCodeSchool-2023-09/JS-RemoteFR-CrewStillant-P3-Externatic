const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const getCandidate = await tables.candidate.readAll();
    if (getCandidate) {
      res.status(200).json(getCandidate);
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
    const candidate = await tables.candidate.read(parseInt(sub, 10));
    if (user[0] && candidate[0]) {
      res.status(200).json([user[0], candidate[0]]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};
// PUT

const edit = async (req, res, next) => {
  const { firstname, lastname, dateOfBirth, wantedSalary, city, country } =
    req.body;
  const { sub } = req.auth;
  try {
    const editCandidate = await tables.candidate.update(
      firstname,
      lastname,
      dateOfBirth,
      wantedSalary,
      city,
      country,
      parseInt(sub, 10)
    );

    if (editCandidate) {
      res.status(200).json(editCandidate);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const { firstname, lastname, dateOfBirth, salary, city, country, insertId } =
    req.body;
  try {
    const addCandidate = await tables.candidate.create(
      firstname,
      lastname,
      dateOfBirth,
      salary,
      city,
      country,
      insertId
    );
    if (addCandidate) {
      res.status(201).json(addCandidate);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add };
