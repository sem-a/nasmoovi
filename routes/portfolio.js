const express = require("express");
const router = express.Router();

// api/portfolio/
router.get("/", );

// api/portfolio/:weeding
router.get("/:wedding", );

// api/portfolio/preview/get/:id
router.get("/preview/get/:id", );

// api/portfolio/add/:id
router.post("/add/:id", );

// api/portfolio/del/:id
router.post("/del/:id", );

// api/portfolio/alldel/:weeding
router.post("/alldel/:id", );

// api/portfolio/edit/:id
router.put("/edit/:id", );

// api/portfolio/preview/update
router.put("/preview/update", );

module.exports = router;
