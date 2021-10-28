const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const apicache = require("apicache");
// const rateLimit = require("express-rate-limit");
require("dotenv").config();

const users = require("./routes/users");
const signup = require("./routes/signup");
const signin = require("./routes/signin");
const image = require("./routes/image");
const profile = require("./routes/profile");
const deleteUser = require("./routes/deleteUser");

const app = express();

// let cache = apicache.middleware;

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 1,
// });

app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(cache("2 minutes"));
// app.set("trust proxy", 1);
app.use(users);
app.use(signup);
app.use(signin);
app.use(image);
app.use(profile);
app.use(deleteUser);

app.listen(
  process.env.PORT,
  console.log(
    `The app is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
