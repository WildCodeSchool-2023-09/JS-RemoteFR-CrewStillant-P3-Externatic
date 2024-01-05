const express = require("express");

const router = express.Router();

// IMPORT ROUTERS

const companyRouter = require("./routers/companyRouter");

router.use("/compagnies", companyRouter);

module.exports = router;
