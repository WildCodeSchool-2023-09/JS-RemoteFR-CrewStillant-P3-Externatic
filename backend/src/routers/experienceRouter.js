const express = require("express");

const router = express.Router();

const {
  read,
  edit,
  add,
  remove,
} = require("../controllers/experienceController");

const { verifyToken } = require("../middlewares/hashPassword");

// GET

router.get("/", verifyToken, read);

// PUT

router.put("/", verifyToken, edit);

// POST

router.post("/", add);

// DELETE

router.delete("/", verifyToken, remove);

module.exports = router;
