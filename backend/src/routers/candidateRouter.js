const express = require("express");

const router = express.Router();
const { browse } = require("../controllers/candidateController");

router.get("/", browse);

module.exports = router;
