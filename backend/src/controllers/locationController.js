const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getLocation = await tables.location.readAll();
    if (getLocation) {
      res.status(200).json(getLocation);
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
    const getLocationId = await tables.location.read(parseInt(sub, 10));
    if (getLocationId.length > 0) {
      res.status(200).json(getLocationId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// CREATE

const create = async (req, res) => {
  const {
    additionalAdress,
    numberAdress,
    numberAttribute,
    address,
    city,
    state,
    country,
    zip,
  } = req.body;
  try {
    const addLocation = await tables.location.create(
      additionalAdress,
      numberAdress,
      numberAttribute,
      address,
      city,
      state,
      country,
      zip
    );
    if (addLocation.InsertId > 0) {
      res.status(201).json("Location has been successefully created");
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
    const deleteLocation = await tables.location.delete(id, parseInt(sub, 10));
    if (deleteLocation) {
      res
        .status(200)
        .json("Location has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, create, remove };
