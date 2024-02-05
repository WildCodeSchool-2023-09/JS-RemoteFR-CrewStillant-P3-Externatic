const express = require("express");

const router = express.Router();

const { read, edit, add } = require("../controllers/candidateController");

// GET
router.get("/", read);

// POST
router.post("/", add);

// PUT
router.put("/:id", edit);

module.exports = router;
