const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  remove,
} = require("../controllers/candidateController");
const { verifyToken } = require("../middlewares/hashPassword");

// POST
router.post("/", add);
// DELETE
router.delete("/:id", remove);

// LOGIN WALL
router.use(verifyToken);

// GET
router.get("/", read);
router.get("/all", browse);
// PUT
router.put("/", edit);

module.exports = router;
