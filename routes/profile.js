const express = require("express");
const router = express.Router();
const { handleGetProfile } = require("../controllers/profile");

router.route("/profile/:id").get(handleGetProfile);

module.exports = router;
