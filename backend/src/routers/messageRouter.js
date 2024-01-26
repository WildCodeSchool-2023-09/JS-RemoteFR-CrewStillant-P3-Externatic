const express = require("express");

const router = express.Router();

// Imports

const {
  browse,
  read,
  add,
  remove,
} = require("../controllers/messageController");

// GET

router.get("/", browse);

router.get("/:id", read);

// POST

router.post("/", add);

// DELETE

router.delete("/:id", remove);

module.exports = router;
