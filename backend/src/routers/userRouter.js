const express = require("express");

const router = express.Router();

const { read, edit, add, remove } = require("../controllers/userController");

const { browseFilters } = require("../controllers/jobController");

// GET

router.get("/search", browseFilters);

router.get("/:id", read);

// POST

router.post("/", add);

// PUT

router.put("/:id", edit);

// DELETE

router.delete("/:id", remove);

module.exports = router;
