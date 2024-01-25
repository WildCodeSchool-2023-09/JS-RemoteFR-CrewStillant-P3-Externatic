const express = require("express");

const router = express.Router();

const { read, edit, add, remove } = require("../controllers/userController");

const { browseFilters } = require("../controllers/jobController");
const upload = require("../services/upload");

console.info(upload);
// GET

router.get("/search", browseFilters);

router.get("/:id", read);

// POST

router.post("/", upload, add);

// PUT

router.put("/:id", edit);

// DELETE

router.delete("/:id", remove);

module.exports = router;
