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

router.get("/confirmations", async (req, res) => {
  const extras = await db.extra.findMany({ where: { teacherId: req.user.id } });
  const participations = await db.participation.findMany({
    where: {
      AND: [
        {
          confirmed: false,
        },
        {
          extraId: {
            in: extras.map((e) => e.id),
          },
        },
      ],
    },
    select: {
      student: {
        select: {
          name: true,
          class: {
            select: { grade: true },
          },
        },
      },
      extra: {
        select: { name: true },
      },
      attendance: true,
      comment: true,
    },
  });
  res.status(200).json({
    participations,
  });
});

module.exports = router;
