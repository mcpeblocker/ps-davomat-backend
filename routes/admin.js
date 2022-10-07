const express = require("express");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.use(auth);
router.use(isAdmin);

// Profile info
router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
