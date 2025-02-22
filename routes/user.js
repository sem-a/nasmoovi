const express = require("express");
const { login, reg, current } = require("../controllers/user");
const { auth } = require("../middleware/auth");
const router = express.Router();

// api/user/login
router.post("/login", login);

// api/user/register
router.post("/reg", reg);

// api/user/current
router.get("/current", auth, current);

module.exports = router;
