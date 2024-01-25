const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  remove,
} = require("../controllers/userController");

const { hash } = require("../middlewares/hashPassword");

// GET

router.get("/", browse);

router.get("/:id", read);

// POST

router.post("/", hash, add);

// PUT

router.put("/:id", hash, edit);

// DELETE

router.delete("/:id", remove);

module.exports = router;
