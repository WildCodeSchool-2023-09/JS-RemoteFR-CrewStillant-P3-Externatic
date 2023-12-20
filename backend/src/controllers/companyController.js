const tables = require("../tables");

// GET

const browse = async (res, req) => {
  try {
    const getCompany = await tables.candidate.readAll(req.body);
    if (getCompany) {
      res.status(200).json("Companies has been successfully called");
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
};

// GET BY ID

const read = async (res, req) => {
  try {
    const getCompanyId = await tables.candidate.readAll(req.params.id);
    if (getCompanyId) {
      res.status(200).json("Company has been successfully called");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (res, req) => {
  try {
    const editCompany = await tables.candidate.update(
      req.body,
      parseInt(req.parms.body, 10)
    );
    if (editCompany) {
      res.status(200).json("Companies has been successfully edited");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// POST

const add = async (res, req) => {
  try {
    const addCompany = await tables.candidate.create(req.body);
    if (addCompany) {
      res.status(201).json("Companies has been successfully added");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE

const remove = async (res, req) => {
  try {
    const removeCompany = await tables.candidate.delete(
      parseInt(req.params.id, 10)
    );
    if (removeCompany) {
      res.status(200).json("Candidate has been successefully deleted");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
