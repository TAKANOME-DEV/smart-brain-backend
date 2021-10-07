const express = require("express");
const { handleGetUsers } = require("../controllers/users");
const router = express.Router();

router.route("/users").get(handleGetUsers);

module.exports = router;
