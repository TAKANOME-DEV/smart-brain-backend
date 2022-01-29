const db = require("../db/db");
const { generateToken, generateHash } = require("../helpers/auth");
const logger = require("../services/logger");

exports.handleGetUsers = async (req, res) => {
	try {
		const users = await db("users");
		return res.json(users);
	} catch (err) {
		logger.error(err);
		return res.status(400).json("an unexpected error occurred");
	}
};

exports.handleGetUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await db("users").where({ id });
		if (!user.length) return res.status(404).json("user not found");
		return res.status(200).json(user[0]);
	} catch (err) {
		logger.error(err);
		return res.status(400).json("an unexpected error occurred");
	}
};

exports.handleCreateUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password)
			return res.status(400).json("incorrect form submission");

		await db.transaction(async (trx) => {
			const query = await trx("users").where({ email });

			if (query.length)
				return res
					.status(400)
					.json("the email address is already in use by another account");

			const hash = await generateHash(password);
			const userMail = await trx("login").returning("email").insert({
				email,
				hash,
			});

			const user = await trx("users").returning("*").insert({
				username,
				email: userMail[0],
				joined: new Date(),
			});

			const token = generateToken(user[0]);
			res.json(token);
			trx.commit;
			trx.rollback;
		});
	} catch (err) {
		logger.error(err);
		return res.status(400).json("Oops, something went wrong");
	}
};

exports.handleDeleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		await db.transaction(async (trx) => {
			const user = await trx("users").where({ id }).returning("*").del();
			if (!user.length) return res.status(404).json("user not found");
			await trx("login").where({ id }).returning("*").del();
			return res.json(user);
		});
	} catch (err) {
		logger.error(err);
		res.status(400).json("Oops, something went wrong");
	}
};
