const winston = require("winston");

module.exports = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize({ all: true }),
				winston.format.prettyPrint({ colorize: true }),
				winston.format.simple()
			),
		}),
		new winston.transports.File({
			level: "error",
			filename: "logfile.log",
		}),
	],
	exceptionHandlers: [
		new winston.transports.File({
			filename: "exceptions.log",
		}),
	],
});
