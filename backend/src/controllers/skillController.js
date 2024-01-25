const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getSkills = await tables.skill.readAll();
    if (getSkills) {
      res.status(200).json(getSkills);
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
    const getSkillId = await tables.skill.read(parseInt(id, 10));
    if (getSkillId[0]) {
      res.status(200).json(getSkillId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { name, level, candidateId, jobId } = req.body;
  const { id } = req.params;
  try {
    const editSkill = await tables.skill.update(
      name,
      level,
      candidateId,
      jobId,
      parseInt(id, 10)
    );

    if (editSkill.length > 0) {
      res.status(200).json(editSkill);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const { name, level, candidateId, jobId } = req.body;
  try {
    const addSkill = await tables.skill.create(name, level, candidateId, jobId);
    if (addSkill) {
      res.status(201).json(addSkill);
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
    const deleteSkill = await tables.candidate.delete(parseInt(id, 10));
    if (deleteSkill) {
      res
        .status(200)
        .json("skill has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, edit, add, remove };