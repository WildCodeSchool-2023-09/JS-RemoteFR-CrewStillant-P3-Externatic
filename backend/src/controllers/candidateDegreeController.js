const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const getCandidateDegree = await tables.candidate_degree.readAll();
    if (getCandidateDegree) {
      res.status(200).json(getCandidateDegree);
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
    const getCandidateDegreeId = await tables.candidate_degree.read(
      parseInt(sub, 10)
    );
    if (getCandidateDegreeId[0]) {
      res.status(200).json(getCandidateDegreeId[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const { candidateId, degreeId } = req.body;
  try {
    const addCandidateDegree = await tables.candidate_degree.create(
      candidateId,
      degreeId
    );
    if (addCandidateDegree) {
      res.status(201).json(addCandidateDegree);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE

const remove = async (req, res, next) => {
  const { sub } = req.auth;
  try {
    const deleteCandidateDegree = await tables.candidate_degree.delete(
      parseInt(sub, 10)
    );
    if (deleteCandidateDegree) {
      res.status(200).json(deleteCandidateDegree);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, add, remove };
