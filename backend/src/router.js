const express = require("express");

const router = express.Router();

// IMPORT ROUTERS

const candidateRouter = require("./routers/candidateRouter");
const companyRouter = require("./routers/companyRouter");
const jobRouter = require("./routers/jobRouter");
const userRouter = require("./routers/userRouter");

router.use("/", userRouter);
router.use("candidate", candidateRouter);
router.use("company", companyRouter);
router.use("/job", jobRouter);

module.exports = router;
