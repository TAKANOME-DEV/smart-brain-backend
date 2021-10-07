const express = require("express");
const router = express.Router();
const { handleUserLogin } = require("../controllers/signin");

router.route("/login").post(handleUserLogin);

module.exports = router;
