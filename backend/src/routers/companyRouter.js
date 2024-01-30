const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  remove,
} = require("../controllers/companyController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET

router.get("/", browse);

router.get("/:id", read);

// PUT

router.put("/:id", edit);

// POST

router.post("/", add);

// LOGIN WALL
router.use(verifyToken);

// DELETE
router.delete("/:id", remove);

module.exports = router;
