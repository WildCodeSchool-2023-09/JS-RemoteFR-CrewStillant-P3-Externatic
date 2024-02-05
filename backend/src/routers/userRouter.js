const express = require("express");

const router = express.Router();

const { read, edit, add, remove } = require("../controllers/userController");

const { browseFilters } = require("../controllers/jobController");

const { hash } = require("../middlewares/hashPassword");

const { validateUserData } = require("../middlewares/validateUser");

const { verifyToken } = require("../middlewares/verifyToken");

// GET

router.get("/search", browseFilters);

router.get("/:id", verifyToken, read);

// POST

router.post("/", validateUserData, hash, add);

// PUT

router.put("/:id", validateUserData, verifyToken, hash, edit);

// DELETE

router.delete("/:id", verifyToken, remove);

module.exports = router;
