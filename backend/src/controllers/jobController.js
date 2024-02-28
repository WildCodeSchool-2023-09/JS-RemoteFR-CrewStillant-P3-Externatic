const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browseFilters = async (req, res, next) => {
  const {
    terms = null,
    location = null,
    salary = null,
    place = null,
    sector = null,
    type = null,
    orderby = null,
    limit = 20,
  } = req.query;
  try {
    // Fetch all offers from the database
    const offers = await tables.job.readAllFilters(
      terms,
      location,
      salary,
      place,
      sector,
      type,
      orderby,
      Number(limit)
    );
    if (offers !== null) {
      res.json(offers);
    } else {
      res.send(401).json({ message: "Recherche non aboutie" });
    }
  } catch (err) {
    next(err);
  }
};

const browse = async (req, res) => {
  try {
    const getJob = await tables.job.readAll();
    if (getJob) {
      res.status(200).json(getJob);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

const browseCount = async (req, res) => {
  try {
    const getJob = await tables.job.readCount();
    if (getJob) {
      res.status(200).json(getJob);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// GET BY ID

const read = async (req, res) => {
  const { sub } = req.auth;

  try {
    const getJobId = await tables.job.read(parseInt(sub, 10));
    if (getJobId) {
      res.status(200).json(getJobId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

const readOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const [getJobId] = await tables.job.readOne(parseInt(id, 10));
    if (getJobId) {
      res.status(200).json(getJobId);
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
    title,
    type,
    description,
    hoursWorked,
    isActive,
    salary,
    place,
    sector,
    locationId,
    companyId,
    id,
  } = req.body;
  const { sub } = req.auth;
  try {
    const editJob = await tables.job.update(
      title,
      type,
      description,
      hoursWorked,
      isActive,
      salary,
      place,
      sector,
      locationId,
      companyId,
      id,
      parseInt(sub, 10)
    );
    if (editJob) {
      res.status(200).json(editJob);
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
    title,
    type,
    description,
    hoursWorked,
    isActive,
    salary,
    place,
    sector,
    locationId,
    companyId,
  } = req.body;
  try {
    const addJob = await tables.job.create(
      title,
      type,
      description,
      hoursWorked,
      isActive,
      salary,
      place,
      sector,
      locationId,
      companyId
    );
    if (addJob) {
      res.status(201).json(addJob);
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
  const { sub } = req.auth;

  try {
    const deleteJob = await tables.job.delete(id, parseInt(sub, 10));
    if (deleteJob) {
      res.status(200).json(deleteJob);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  browseFilters,
  browseCount,
  browse,
  read,
  readOffer,
  edit,
  add,
  remove,
};
