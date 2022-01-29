const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
			entries: user.entries,
			joined: user.joined,
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

const getToken = (req) => req.header("X-Auth-Token");

const verifyToken = (token) => jwt.verify(token, process.env.JWT_PRIVATE_KEY);

const generateHash = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const validateHash = async (password, hash) =>
	await bcrypt.compare(password, hash);

module.exports = {
	generateToken,
	getToken,
	verifyToken,
	generateHash,
	validateHash,
};
