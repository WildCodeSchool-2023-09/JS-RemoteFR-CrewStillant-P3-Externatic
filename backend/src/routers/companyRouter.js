const express = require("express");

const router = express.Router();

const { read, edit, add, remove } = require("../controllers/companyController");

// GET
router.get("/", read);

// PUT
router.put("/:id", edit);

// POST
router.post("/", add);

// DELETE
router.delete("/:id", remove);

module.exports = router;
