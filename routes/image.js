const express = require("express");
const router = express.Router();
const { handleUpdateEntries } = require("../controllers/image");

router.route("/image").put(handleUpdateEntries);

module.exports = router;
