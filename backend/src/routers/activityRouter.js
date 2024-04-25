const express = require("express");

const router = express.Router();

const { read, create, remove } = require("../controllers/activityController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET
router.get("/", verifyToken, read);

// CREATE
router.post("/", create);

// DELETE
router.delete("/:id", verifyToken, remove);

module.exports = router;
