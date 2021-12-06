const express = require("express");
const router = express.Router();
const { handleDeleteUser } = require("../controllers/deleteUser");

router.route("/delete/:id").delete(handleDeleteUser);

// module.exports = router;
