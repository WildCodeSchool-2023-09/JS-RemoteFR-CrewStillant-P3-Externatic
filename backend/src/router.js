const express = require("express");

const router = express.Router();

/* IMPORT ROUTERS */

const companyRouter = require("./routers/companyRouter");

/* COMPANY */

router.use("/entreprise", companyRouter);

module.exports = router;
