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
    if (getCompanyId[0]) {
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
    description,
    website,
    establishmentDate,
    siret,
    insertId2: companySectorId,
    insertId: userId,
  } = req.body;
  try {
    const insertId = await tables.company.create(
      name,
      description,
      website,
      establishmentDate,
      siret,
      companySectorId,
      userId
    );
    if (insertId) {
      res
        .status(201)
        .json({ insertId, message: "Votre entreprise a bien été crée." });
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
