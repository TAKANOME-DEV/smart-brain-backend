const express = require("express");
const { handleAuth } = require("../controllers/auth");
const router = express.Router();

router.post("/", handleAuth);

module.exports = router;
