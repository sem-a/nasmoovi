const express = require("express");
const { all, one, add, edit, del } = require("../controllers/wedding");
const { auth } = require("../middleware/auth");
const router = express.Router();

// api/wedding/
router.get("/", all);

// api/wedding/:id
router.get("/:id", one);

// api/wedding/add
router.post("/add", auth, add);

// api/wedding/edit/:id
router.put("/edit/:id", auth, edit);

// api/wedding/del/:id
router.put("/del/:id", auth, del);

module.exports = router;
