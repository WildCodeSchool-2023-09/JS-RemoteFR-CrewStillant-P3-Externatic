const express = require("express");

const router = express.Router();

const { add, read, edit } = require("../controllers/userController");

// const { browseFilters } = require("../controllers/jobController");

const { hash, verifyToken } = require("../middlewares/hashPassword");

// POST
router.post("/", hash, add);

// LOGIN WALL
router.use(verifyToken);

// GET
router.get("/", read);
// router.get("/search", browseFilters);
// PUT
router.put("/", hash, edit);

module.exports = router;
