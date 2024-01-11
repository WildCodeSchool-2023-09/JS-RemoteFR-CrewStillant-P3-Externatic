const express = require("express");

const router = express.Router();

const {
  browse,
  edit,
  add,
  remove,
} = require("../controllers/experienceController");

// GET

router.get("/", browse);

// PUT

router.put("/:id", edit);

// POST

router.post("/", add);

// DELETE

router.delete("/:id", remove);

module.exports = router;
