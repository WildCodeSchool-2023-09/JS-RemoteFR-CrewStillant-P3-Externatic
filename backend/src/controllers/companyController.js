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

const read = async (req, res, next) => {
  const { sub } = req.auth;
  try {
    const user = await tables.user.read(parseInt(sub, 10));
    const company = await tables.company.read(parseInt(sub, 10));
    if (user[0] && company[0]) {
      res.status(200).json([user[0], company[0]]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { name, image, description, website, establishmentDate } = req.body;
  const { sub } = req.auth;
  try {
    const editCompany = await tables.company.update(
      name,
      image,
      description,
      website,
      establishmentDate,
      parseInt(sub, 10)
    );

    if (editCompany.affectedRows > 0) {
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
  const { sub } = req.auth;
  try {
    const removeCompany = await tables.company.delete(parseInt(sub, 10));
    if (removeCompany) {
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
