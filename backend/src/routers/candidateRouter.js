const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  remove,
} = require("../controllers/candidateController");
const upload = require("../services/upload");

// GET

router.get("/", browse);

router.get("/:id", read);

// PUT

router.put("/:id", edit);

// POST

router.post("/", upload, add);

// DELETE

router.delete("/:id", remove);

module.exports = router;
