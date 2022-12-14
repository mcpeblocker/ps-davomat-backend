require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./utils/config");
const app = require("./server");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./routes");

app.listen(config.port, () => {
  console.log("Server started at port " + config.port);
});
