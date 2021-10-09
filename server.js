const express = require("express");
const cors = require("cors");
require("dotenv").config();

const users = require("./routes/users");
const register = require("./routes/register");
const signin = require("./routes/signin");
const image = require("./routes/image");
const profile = require("./routes/profile");
const deleteUser = require("./routes/deleteUser");

const app = express();

app.use(express.json());
app.use(cors());

app.use(users);
app.use(register);
app.use(signin);
app.use(image);
app.use(profile);
app.use(deleteUser);

app.listen(
  process.env.PORT,
  console.log(
    `The app is running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`
  )
);
