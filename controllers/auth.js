const db = require("../db/db");
const { validateHash, generateToken } = require("../helpers/auth");

exports.handleAuth = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json("incorrect form submission");

		// deepcode ignore Sqli: <please specify a reason of ignoring this>
		const query = await db("email", "hash").from("login").where({ email });
		if (!query.length) return res.status(400).json("email or password invalid");

		const isValid = await validateHash(password, query[0].hash);
		if (!isValid) return res.status(400).json("email or password invalid");

		const user = await db("users").where({ email });
		const token = generateToken(user[0]);
		return res.json(token);
	} catch (error) {
		logger.error(err);
		return res.status(400).json("Oops, something went wrong");
	}
};
