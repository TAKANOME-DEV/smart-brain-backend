const express = require("express");
const fetch = require("node-fetch");
const logger = require("../services/logger");
const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const raw = JSON.stringify({
			user_app_id: {
				user_id: process.env.USER_ID,
				app_id: process.env.APP_ID,
			},
			inputs: [
				{
					data: {
						image: {
							url: req.body.input,
						},
					},
				},
			],
		});

		const requestOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: process.env.CLARIFAI_API_KEY,
			},
			body: raw,
		};

		const result = await fetch(process.env.CLARIFAI_ENDPOINT, requestOptions);
		const data = await result.json();

		if (data.status.code !== 10000)
			return res.status(400).json(data.outputs[0].status.description);

		return res.json(data.outputs[0].data.regions[0].region_info.bounding_box);
	} catch (err) {
		logger.error(err);
		return res.status(400).json(err);
	}
});

module.exports = router;
