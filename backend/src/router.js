const express = require("express");

const router = express.Router();

// IMPORT ROUTERS
const userRouter = require("./routers/userRouter");
const candidateRouter = require("./routers/candidateRouter");
const companyRouter = require("./routers/companyRouter");

router.use("/", userRouter);
router.use("candidate", candidateRouter);
router.use("company", companyRouter);

module.exports = router;
