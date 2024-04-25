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
const sectorRouter = require("./routers/sectorRouter");
const skillRouter = require("./routers/skillRouter");
const authRouter = require("./routers/authRouter");
const adminRouter = require("./routers/adminRouter");
const candidateDegreeRouter = require("./routers/candidateDegreeRouter");
const locationRouter = require("./routers/locationRouter");

// ROUTES

router.use("/user", userRouter);
router.use("/job", jobRouter);
router.use("/login", authRouter);
router.use("/candidate", candidateRouter);
router.use("/degree", degreeRouter);
router.use("/experience", experienceRouter);
router.use("/candidate-degree", candidateDegreeRouter);
router.use("/company", companyRouter);
router.use("/location", locationRouter);
router.use("/admin", adminRouter);
router.use("/activity", activityRouter);
router.use("/message", messageRouter);
router.use("/sector", sectorRouter);
router.use("/skill", skillRouter);

module.exports = router;
