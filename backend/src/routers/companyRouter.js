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
router.get("/all", verifyToken, browse);
router.get("/", verifyToken, read);

// PUT
router.put("/", verifyToken, edit);

// POST
router.post("/", add);

// DELETE
router.delete("/:id", verifyToken, remove);

module.exports = router;
