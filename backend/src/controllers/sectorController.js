const tables = require("../tables");

// POST

const add = async (req, res) => {
  const { sector } = req.body;
  try {
    const addSector = await tables.company_sector.create(sector);
    if (addSector) {
      res.status(201).json(addSector);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { add };
