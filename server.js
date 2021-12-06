require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const signup = require("./routes/signup");
const signin = require("./routes/signin");
const image = require("./routes/image");
const profile = require("./routes/profile");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(helmet());

const allowlist = [
  "https://takanome-smart-brain.netlify.app",
  process.env.LOCAL_CORS,
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    const isAllowList = allowlist.indexOf(origin) !== -1;
    if (isAllowList) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(signup);
app.use(signin);
app.use(image);
app.use(profile);

app.listen(
  PORT,
  console.log(
    `The app is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
