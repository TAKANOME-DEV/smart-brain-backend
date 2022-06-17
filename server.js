require('dotenv').config();
const express = require('express');
// const cors = require("cors");
const helmet = require('helmet');
const compression = require('compression');

const users = require('./routes/users');
const auth = require('./routes/auth');
const entry = require('./routes/entry');
const clarifai = require('./routes/clarifai');
const logger = require('./services/logger');

const app = express();

// const allowlist = [process.env.PROD_ENDPOINT, process.env.DEV_ENDPOINT];
// const corsOptions = {
// 	origin: function (origin, callback) {
// 		const isAllowList = allowlist.indexOf(origin) !== -1;
// 		if (isAllowList) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// };

app.use(express.json());
app.use(helmet());
app.use(compression());
// app.use(cors(corsOptions));
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/entry', entry);
app.use('/api/clarifai', clarifai);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  logger.info(
    `Server is listening in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
