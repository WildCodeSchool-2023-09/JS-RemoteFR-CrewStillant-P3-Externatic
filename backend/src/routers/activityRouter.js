const express = require("express");

const router = express.Router();

const { read, remove } = require("../controllers/activityController");

// GET
router.get("/", read);

// DELETE
router.delete("/:id", remove);

module.exports = router;
