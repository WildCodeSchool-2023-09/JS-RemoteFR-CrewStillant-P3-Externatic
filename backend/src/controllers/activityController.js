const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getActivity = await tables.activity.readAll();
    if (getActivity) {
      res.status(200).json(getActivity);
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
    const getActivityId = await tables.activity.read(parseInt(sub, 10));
    if (getActivityId.length > 0) {
      res.status(200).json(getActivityId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// CREATE

const create = async (req, res) => {
  const { jobId, candidateId } = req.body;
  try {
    const createActivity = await tables.activity.create(jobId, candidateId);
    if (createActivity) {
      res.status(201).json("Activity has been successefully created");
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
    const deleteActivity = await tables.activity.delete(id, parseInt(sub, 10));
    if (deleteActivity) {
      res
        .status(200)
        .json("Activity has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, create, remove };
