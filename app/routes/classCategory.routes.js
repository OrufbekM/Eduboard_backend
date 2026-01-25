const express = require("express");
const router = express.Router();
 
const {
  createClassCategory,
  updateClassCategory,
  deleteClassCategory,
} = require("../controllers/classCategory.controller");

const {
  validateCreateClassCategory,
  validateUpdateClassCategory,
  validateClassCategoryId,
} = require("../middleware/classCategory.middleware");

router.post("/create", validateCreateClassCategory, createClassCategory);
router.put("/:id/update", validateUpdateClassCategory, updateClassCategory);
router.delete("/:id/delete", validateClassCategoryId, deleteClassCategory);

module.exports = router;
