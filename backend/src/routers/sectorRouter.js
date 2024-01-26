const express = require("express");

const router = express.Router();

const { add } = require("../controllers/sectorController");

// POST

router.post("/", add);

module.exports = router;
