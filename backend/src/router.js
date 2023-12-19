const express = require("express");

const router = express.Router();

/* IMPORT ROUTERS */

const userRouter = require("./routers/userRouter");
const candidateRouter = require("./routers/candidateRouter");
const companyRouter = require("./routers/companyRouter");
const consultantRouter = require("./routers/consultantRouter");

/* USER */

router.use("/", userRouter);

/* CANDIDATE */

router.use("/candidat", candidateRouter);

/* COMPANY */

router.use("/entreprise", companyRouter);

/* CONSULTANT */

router.use("/consultant", consultantRouter);

module.exports = router;
