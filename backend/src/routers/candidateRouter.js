const express = require("express");

const router = express.Router();

const {
  read,
  edit,
  add,
  remove,
} = require("../controllers/candidateController");
const { verifyToken } = require("../middlewares/hashPassword");

// POST
router.post("/", add);

// LOGIN WALL
router.use(verifyToken);

router.get("/", read);

// PUT
router.put("/:id", edit);

// DELETE
router.delete("/:id", remove);

module.exports = router;
