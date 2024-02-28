const express = require("express");

const router = express.Router();

const { add, read, edit, remove } = require("../controllers/userController");
const { validateUserData } = require("../middlewares/validateUser");

const { browseFilters } = require("../controllers/jobController");

const { hash, verifyToken } = require("../middlewares/hashPassword");

// POST
router.post("/", validateUserData, hash, add);

// LOGIN WALL
router.use(verifyToken);

// GET
router.get("/", read);
router.get("/search", browseFilters);
// PUT
router.put("/", validateUserData, hash, verifyToken, edit);
// DELETE
router.delete("/", verifyToken, remove);

module.exports = router;
