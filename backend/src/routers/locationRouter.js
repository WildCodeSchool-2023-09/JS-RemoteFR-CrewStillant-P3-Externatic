const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  create,
  remove,
} = require("../controllers/locationController");

const { verifyToken } = require("../middlewares/hashPassword");

// GET

router.get("/", browse);
router.get("/", verifyToken, read);

// POST

router.post("/", create);

// DELETE

router.delete("/:id", verifyToken, remove);

module.exports = router;
