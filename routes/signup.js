const express = require("express");
const router = express.Router();
const { handleUserSignup } = require("../controllers/signup");

router.route("/signup").post(handleUserSignup);

module.exports = router;
