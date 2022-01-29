const logger = require("../services/logger");
const { getToken, verifyToken } = require("../helpers/auth");

const requireAuth = async (req, res, next) => {
	const token = getToken(req);
	if (!token) return res.status(401).json("access denied, no token provided");

	try {
		verifyToken(token);
		return next();
	} catch (err) {
		logger.error(err);
		return res.status(400).json("Invalid token");
	}
};

const requireAdmin = async (req, res, next) => {
	const token = getToken(req);
	if (!token) return res.status(401).json("access denied, no token provided");

	try {
		const decoded = verifyToken(token);
		const isAdmin = Object.keys(decoded).includes("isAdmin");
		if (!isAdmin) return res.status(403).json("Access denied.");
		return next();
	} catch (err) {
		logger.error(err);
		return res.status(400).json("Invalid token");
	}
};

exports.requireAuth = requireAuth;
exports.requireAdmin = requireAdmin;
