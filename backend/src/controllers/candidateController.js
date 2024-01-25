const tables = require("../tables");

// GET

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

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const getCandidateId = await tables.candidate.read(parseInt(id, 10));
    if (getCandidateId[0]) {
      res.status(200).json(getCandidateId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { firstname, lastname, dateOfBirth, wantedSalary } = req.body;
  const { id } = req.params;
  try {
    const editCandidate = await tables.candidate.update(
      firstname,
      lastname,
      dateOfBirth,
      wantedSalary,
      parseInt(id, 10)
    );

    if (editCandidate.length > 0) {
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
  const { firstname, lastname, dateOfBirth, wantedSalary, insertId } = req.body;
  const { cv } = req.file;
  try {
    const addCandidate = await tables.candidate.create(
      firstname,
      lastname,
      dateOfBirth,
      wantedSalary,
      cv,
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

// DELETE

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCandidate = await tables.candidate.delete(parseInt(id, 10));
    if (deleteCandidate) {
      res
        .status(200)
        .json("candidate has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
