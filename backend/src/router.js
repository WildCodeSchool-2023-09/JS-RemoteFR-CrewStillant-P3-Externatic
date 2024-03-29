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
const { verifyToken } = require("./middlewares/hashPassword");

// ROUTES

router.use("/user", userRouter);
router.use("/job", jobRouter);
router.use("/login", authRouter);
router.use("/candidate", candidateRouter);

// Token identification wall, protecting routers below.
router.use("/company", verifyToken, companyRouter);
router.use("/admin", verifyToken, adminRouter);
router.use("/activity", verifyToken, activityRouter);
router.use("/message", verifyToken, messageRouter);
router.use("/sector", verifyToken, sectorRouter);
router.use("/skill", verifyToken, skillRouter);
router.use("/degree", verifyToken, degreeRouter);
router.use("/experience", verifyToken, experienceRouter);

module.exports = router;
