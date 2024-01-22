const tables = require("../tables");

// GET

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

// GET BY ID

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const getJobId = await tables.job.read(parseInt(id, 10));
    if (getJobId.length > 0) {
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
    salary,
    hoursWorked,
    isActive,
    locationId,
    companyId,
  } = req.body;
  const { id } = req.params;
  try {
    const editJob = await tables.job.edit(
      title,
      type,
      description,
      salary,
      hoursWorked,
      isActive,
      locationId,
      companyId,
      parseInt(id, 10)
    );
    if (editJob.length > 0) {
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
    salary,
    hoursWorked,
    isActive,
    locationId,
    companyId,
  } = req.body;
  try {
    const addJob = await tables.job.create(
      title,
      type,
      description,
      salary,
      hoursWorked,
      isActive,
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
  try {
    const deleteJob = await tables.job.delete(parseInt(id, 10));
    if (deleteJob.length > 0) {
      res.status(200).json(deleteJob);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
