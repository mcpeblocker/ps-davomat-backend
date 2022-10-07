const express = require("express");
const auth = require("../middlewares/auth");
const isMentor = require("../middlewares/isMentor");

const router = express.Router();

router.use(auth);
router.use(isMentor);

// Profile info
router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
