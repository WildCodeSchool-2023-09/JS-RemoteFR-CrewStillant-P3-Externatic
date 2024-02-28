const express = require("express");

const router = express.Router();

const {
  browse,
  browseFilters,
  read,
  readOffer,
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
router.get("/companyoffers", verifyToken, read);
router.get("/:id", readOffer);
// TOKEN WALL

// POST
router.post("/", add);

// PUT
router.put("/", verifyToken, edit);

// DELETE
router.delete("/:id", verifyToken, remove);

module.exports = router;
