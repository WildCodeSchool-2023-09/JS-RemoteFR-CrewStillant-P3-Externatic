const express = require("express");

const router = express.Router();
const { browse } = require("../controllers/jobController");

router.get("/search", browse);

module.exports = router;
