const express = require("express");
const { handleGetUsers } = require("../controllers/users");
const router = express.Router();

router.route("/").get(handleGetUsers);

module.exports = router;
