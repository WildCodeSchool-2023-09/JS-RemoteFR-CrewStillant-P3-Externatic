const express = require("express");

const router = express.Router();
const { browse } = require("../controllers/userController");

router.get("/", browse);

module.exports = router;
