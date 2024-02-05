const express = require("express");

const router = express.Router();

const { browse, read, remove } = require("../controllers/activityController");

// GET
router.get("/", browse);
router.get("/:id", read);

// DELETE
router.delete("/:id", remove);

module.exports = router;
