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
  const { id } = req.params;
  try {
    const getActivityId = await tables.activity.read(parseInt(id, 10));
    if (getActivityId) {
      res.status(200).json(getActivityId[0]);
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
    const deleteActivity = await tables.activity.delete(parseInt(id, 10));
    if (deleteActivity.length > 0) {
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

module.exports = { browse, read, remove };
