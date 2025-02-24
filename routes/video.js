const express = require("express");
const router = express.Router();
const { uploadVideo } = require("../middleware/upload");
const { auth } = require("../middleware/auth");
const { add, getAll, del } = require("../controllers/video");
const { deleteVideo } = require("../middleware/delete");

router.get("/", getAll);

// api/video/add
router.post("/add", auth, uploadVideo.single("file"), add);

// api/video/del/:id
router.delete("/del/:id", auth, deleteVideo, del);

module.exports = router;
