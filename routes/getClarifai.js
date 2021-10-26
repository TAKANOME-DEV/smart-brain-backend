const express = require("express");
const { handleGetClarifaiResponse } = require("../controllers/getClarifai");
const router = express.Router();

router.route("/clarifai").post(handleGetClarifaiResponse);

module.exports = router;
