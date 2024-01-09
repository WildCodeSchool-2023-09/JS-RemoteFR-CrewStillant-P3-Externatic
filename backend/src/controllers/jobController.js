const tables = require("../tables");

// GET

const browse = async (req, res, next) => {
  try {
    const getJob = await tables.job.readAll();

    res.json(getJob);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse };
