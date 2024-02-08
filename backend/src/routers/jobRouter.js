const express = require("express");

const router = express.Router();

const {
  browse,
  browseFilters,
  read,
  readOffer,
  browseCount,
} = require("../controllers/jobController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET

router.get("/", browse);
router.get("/count", browseCount);
router.get("/searchPage", browseFilters);
router.get("/companyoffers", verifyToken, read);
router.get("/:id", readOffer);

module.exports = router;
