const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  remove,
} = require("../controllers/candidateDegreeController");

const { verifyToken } = require("../middlewares/hashPassword");

// GET

router.get("/", browse);
router.get("/", verifyToken, read);

// POST

router.post("/", verifyToken, add);

// DELETE

router.delete("/", verifyToken, remove);

module.exports = router;
