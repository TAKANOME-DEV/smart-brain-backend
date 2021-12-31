require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
//* Routes
const signup = require("./routes/signup");
const signin = require("./routes/signin");
const image = require("./routes/image");
const profile = require("./routes/profile");

//* Initialize App
const app = express();

//* Cors Options
const allowlist = [
  "https://takanome-smart-brain.netlify.app",
  process.env.LOCAL_CORS,
];
const corsOptions = {
  origin: function (origin, callback) {
    const isAllowList = allowlist.indexOf(origin) !== -1;
    if (isAllowList) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//* Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(signup);
app.use(signin);
app.use(image);
app.use(profile);

const PORT = process.env.PORT;

//* Listen To A PORT
app.listen(
  PORT,
  console.log(
    `The app is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
