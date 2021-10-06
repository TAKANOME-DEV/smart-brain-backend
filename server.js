const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => res.send("Hello"));

app.listen(
  process.env.PORT,
  console.log(
    `The app is running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`
  )
);
