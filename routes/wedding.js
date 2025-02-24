const express = require("express");
const { all, one, add, edit, del } = require("../controllers/wedding");
const { auth } = require("../middleware/auth");
const { deletePhotoForWedding } = require("../middleware/delete");
const router = express.Router();

// api/weddings/
router.get("/", all);

// api/weddings/:id
router.get("/:id", one);

// api/weddings/add
router.post("/add", auth, add);

// api/weddings/edit/:id
router.put("/edit/:id", auth, edit);

// api/weddings/del/:id
router.delete("/del/:id", auth, deletePhotoForWedding, del);

module.exports = router;
