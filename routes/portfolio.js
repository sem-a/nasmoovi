const express = require("express");
const { uploadPhoto } = require("../middleware/upload");
const {
  add,
  all,
  getForWeddingId,
  getPreview,
  delForId,
  updatePreview,
} = require("../controllers/portfolio");
const { auth } = require("../middleware/auth");
const { deletePhoto } = require("../middleware/delete");
const router = express.Router();

// api/portfolio/
router.get("/", all);

// api/portfolio/:weeding
router.get("/:wedding", getForWeddingId);

// api/portfolio/preview/:wedding
router.get("/preview/:wedding", getPreview);

// api/portfolio/add/:wedding
router.post("/add/:wedding", auth, uploadPhoto.array("file", 100), add);

// api/portfolio/del/:id
router.delete("/del/:id", auth, deletePhoto, delForId);

// api/portfolio/preview/update
router.put("/preview/update/:wedding", auth, updatePreview);

module.exports = router;
