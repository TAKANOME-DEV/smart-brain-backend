const express = require("express");
const router = express.Router();
const { handleUserRegister } = require("../controllers/register");

router.route("/register").post(handleUserRegister);

module.exports = router;
