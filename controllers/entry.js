const db = require("../db/db");

exports.handleUpdateEntry = async (req, res) => {
	try {
		const { id } = req.body;

		const entry = await db("users")
			.where({ id })
			.increment("entries")
			.returning("entries");
		return res.json(+entry[0]);
	} catch (err) {
		logger.error(err);
		return res.status(500).json("internal server error");
	}
};
