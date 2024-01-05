const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getCompany = await tables.company.readAll();
    if (getCompany) {
      res.status(200).json(getCompany);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
};

// GET BY ID

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const getCompanyId = await tables.company.read(parseInt(id, 10));
    if (getCompanyId.length > 0) {
      res.status(200).json(getCompanyId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { name, image, description, website, establishmentDate } = req.body;
  const { id } = req.params;
  try {
    const editCompany = await tables.company.update(
      name,
      image,
      description,
      website,
      establishmentDate,
      parseInt(id, 10)
    );

    if (editCompany.length > 0) {
      res.status(200).json(editCompany);
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
    name,
    image,
    description,
    website,
    establishmentDate,
    companySectorId,
    userId,
  } = req.body;
  try {
    const addCompany = await tables.company.create(
      name,
      image,
      description,
      website,
      establishmentDate,
      companySectorId,
      userId
    );
    if (addCompany) {
      res.status(201).json(addCompany);
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
    const removeCompany = await tables.company.delete(parseInt(id, 10));
    if (removeCompany.length > 0) {
      res
        .status(200)
        .json("Company has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };
