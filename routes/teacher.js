const express = require("express");
const db = require("../database");
const auth = require("../middlewares/auth");
const isTeacher = require("../middlewares/isTeacher");

const router = express.Router();

router.use(auth);
router.use(isTeacher);

// Profile info
router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});

// Class info
router.get("/class", async (req, res) => {
  const group = await db.class.findFirst({
    where: { mentorId: req.user.id },
    include: { students: true, extras: true },
  });
  if (!group) {
    return res.status(404).json({
      message: "You don't have any class ",
    });
  }
  res.status(200).json({
    class: group,
  });
});

module.exports = router;
