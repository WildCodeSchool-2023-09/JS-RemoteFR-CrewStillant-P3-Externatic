const express = require("express");

const router = express.Router();

// IMPORT ROUTERS

const candidateRouter = require("./routers/candidateRouter");
const companyRouter = require("./routers/companyRouter");
const jobRouter = require("./routers/jobRouter");
const userRouter = require("./routers/userRouter");
const degreeRouter = require("./routers/degreeRouter");
const experienceRouter = require("./routers/experienceRouter");
const activityRouter = require("./routers/activityRouter");
const messageRouter = require("./routers/messageRouter");

// ROUTES

router.use("/user", userRouter);
router.use("/candidate", candidateRouter);
router.use("/company", companyRouter);
router.use("/job", jobRouter);
router.use("/degree", degreeRouter);
router.use("/experience", experienceRouter);
router.use("/activity", activityRouter);
router.use("/message", messageRouter);

module.exports = router;
