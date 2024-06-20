const express = require("express");

const router = express.Router();

// Imports

const { read, add, remove } = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET
router.get("/", verifyToken, read);

// POST
router.post("/", add);

// DELETE
router.delete("/:id", remove);

module.exports = router;
