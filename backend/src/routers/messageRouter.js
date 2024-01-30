const express = require("express");

const router = express.Router();

// Imports

const {
  browse,
  read,
  add,
  remove,
} = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET
router.get("/", browse);
router.get("/:id", read);

// LOGIN WALL
router.use(verifyToken);
// POST
router.post("/", add);

// DELETE
router.delete("/:id", remove);

module.exports = router;
