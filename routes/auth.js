const express = require("express");
const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  return res.status(200).json({ message: "Success", user: req.user });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(400).json({
      message: "User not found!",
    });
  }
  // validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
  // generate token
  const token = jwt.sign({ userId: user.id }, config.jwtSecret);
  delete user.password;
  return res.status(200).json({
    message: "Success.",
    token,
  });
});

router.post("/logout", (req, res) => {
  res.status(200).json({
    message: "Success.",
  });
});

module.exports = router;
