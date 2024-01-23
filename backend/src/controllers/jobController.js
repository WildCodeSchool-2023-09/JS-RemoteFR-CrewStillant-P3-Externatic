const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
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
    const offers = await tables.job.readAll(
      terms,
      location,
      salary,
      place,
      sector,
      type,
      orderby,
      Number(limit)
    );
    res.json(offers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
};
