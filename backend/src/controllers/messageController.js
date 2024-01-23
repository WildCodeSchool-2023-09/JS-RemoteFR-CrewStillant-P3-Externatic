const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getMessage = await tables.message.readAll();
    if (getMessage) {
      res.status(200).json(getMessage);
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
    const getMessageId = await tables.message.read(parseInt(id, 10));
    if (getMessageId[0]) {
      res.status(200).json(getMessageId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// POST

const add = async (req, res) => {
  const { subject, text, userId } = req.body;
  try {
    const addMessage = await tables.message.create(subject, text, userId);
    if (addMessage) {
      res.status(201).json(addMessage);
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
    const deleteMessage = await tables.message.delete(parseInt(id, 10));
    if (deleteMessage[0]) {
      res
        .status(200)
        .json("Message has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browse, read, add, remove };
