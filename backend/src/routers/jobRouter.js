const express = require("express");

const router = express.Router();

const {
  browse,
  browseFilters,
  read,
  edit,
  add,
  remove,
  browseCount,
} = require("../controllers/jobController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET

router.get("/", browse);
router.get("/count", browseCount);
router.get("/searchPage", browseFilters);
router.get("/:id", read);

// LOGIN WALL
router.use(verifyToken);

// POST
router.post("/", add);

// PUT
router.put("/:id", edit);

// DELETE
router.delete("/:id", remove);

module.exports = router;
