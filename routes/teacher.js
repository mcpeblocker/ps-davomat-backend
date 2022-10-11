const express = require("express");
const db = require("../database");
const auth = require("../middlewares/auth");
const isTeacher = require("../middlewares/isTeacher");
const { getWeekDay } = require("../utils/date");

const router = express.Router();

router.use(auth);
router.use(isTeacher);

// Profile info
router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/extras", async (req, res) => {
  const weekDay = getWeekDay();
  const extras = await db.extra.findMany({
    where: {
      AND: [
        {
          teacherId: req.user.id,
        },
        {
          day: weekDay,
        },
      ],
    },
    include: {
      class: {
        include: {
          students: true,
        },
      },
    },
  });
  res.status(200).json({
    extras,
  });
});

router.post("/confirm", async (req, res) => {
  const { participations } = req.body;
  const created = [];
  for (let data of participations) {
    try {
      data.createdById = req.user.id;
      const participation = await db.participation.create({ data });
      created.push(participation);
    } catch (err) {}
  }
  res.status(200).json({ participations: created });
});

module.exports = router;
