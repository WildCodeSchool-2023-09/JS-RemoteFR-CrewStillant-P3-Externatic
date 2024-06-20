const express = require("express");

const router = express.Router();

const {
  browse,
  browseAdmin,
  browseFilters,
  read,
  readOffer,
  edit,
  add,
  remove,
  adminDelete,
  browseCount,
} = require("../controllers/jobController");
const { verifyToken } = require("../middlewares/hashPassword");

// GET
router.get("/all", browseAdmin);
router.get("/", browse);
router.get("/count", browseCount);
router.get("/searchPage", browseFilters);
router.get("/companyoffers", verifyToken, read);
router.get("/:id", readOffer);

// POST
router.post("/", add);

// PUT
router.put("/", verifyToken, edit);

// DELETE
router.delete("/:id", verifyToken, remove);
router.delete("/job/:id", adminDelete);

module.exports = router;
