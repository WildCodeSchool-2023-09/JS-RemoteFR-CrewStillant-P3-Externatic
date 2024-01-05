const express = require("express");

const router = express.Router();

const { browse } = require("../controllers/jobController");

// GET

router.get("/", browse);

module.exports = router;
