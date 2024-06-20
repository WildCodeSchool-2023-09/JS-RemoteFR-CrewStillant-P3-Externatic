const express = require("express");

const router = express.Router();

const { browse, read, edit, add } = require("../controllers/adminController");

const { verifyToken } = require("../middlewares/hashPassword");

// GET
router.get("/all", verifyToken, browse);
router.get("/", verifyToken, read);

// PUT
router.put("/", verifyToken, edit);

// POST
router.post("/", add);

module.exports = router;
