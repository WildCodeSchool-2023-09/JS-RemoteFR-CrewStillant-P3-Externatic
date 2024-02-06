const express = require("express");

const router = express.Router();

// Imports

const { read, add, remove } = require("../controllers/messageController");

// GET
router.get("/", read);

// POST
router.post("/", add);

// DELETE
router.delete("/:id", remove);

module.exports = router;
