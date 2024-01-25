const express = require("express");

const router = express.Router();

const {
  browse,
  browseFilters,
  read,
  edit,
  add,
  remove,
} = require("../controllers/jobController");

// GET

router.get("/", browse);
router.get("/searchPage", browseFilters);

router.get("/:id", read);

// POST

router.post("/", add);

// PUT

router.put("/:id", edit);

// DELETE

router.delete("/:id", remove);

module.exports = router;
