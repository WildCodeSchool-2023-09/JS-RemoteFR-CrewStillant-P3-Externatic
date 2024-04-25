const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getExperience = await tables.experience.readAll();
    if (getExperience) {
      res.status(200).json(getExperience);
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
    const getExperienceId = await tables.experience.read(parseInt(sub, 10));
    if (getExperienceId) {
      res.status(200).json(getExperienceId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const {
    jobTitle,
    companyName,
    startDate,
    endDate,
    description,
    city,
    country,
    id,
  } = req.body;
  const { sub } = req.auth;
  try {
    const editExperience = await tables.experience.update(
      jobTitle,
      companyName,
      startDate,
      endDate,
      description,
      city,
      country,
      id,
      parseInt(sub, 10)
    );

    if (editExperience.affectedRows > 0) {
      res.status(200).json(editExperience);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const {
    jobTitle,
    companyName,
    startDate,
    endDate,
    description,
    city,
    country,
    candidateId,
  } = req.body;
  try {
    const addExperience = await tables.experience.create(
      jobTitle,
      companyName,
      startDate,
      endDate,
      description,
      city,
      country,
      candidateId
    );
    if (addExperience) {
      res.status(201).json(addExperience);
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
  const { id } = req.params;
  try {
    const deleteExperience = await tables.experience.delete(
      id,
      parseInt(sub, 10)
    );
    if (deleteExperience) {
      res
        .status(200)
        .json("Experience has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
