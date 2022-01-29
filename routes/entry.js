const express = require("express");
const router = express.Router();
const { handleUpdateEntry } = require("../controllers/entry");

router.put("/", handleUpdateEntry);

module.exports = router;
