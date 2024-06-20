const express = require("express");

const router = express.Router();

const { read, edit, add, remove } = require("../controllers/degreeController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET

router.get("/", verifyToken, read);

// PUT

router.put("/", verifyToken, edit);

// POST

router.post("/", add);

// DELETE

router.delete("/:id", verifyToken, remove);

module.exports = router;
