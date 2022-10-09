const express = require("express");
const db = require("../database");
const auth = require("../middlewares/auth");
const isMentor = require("../middlewares/isMentor");
const { getWeekDay, getHour } = require("../utils/date");

const router = express.Router();

router.use(auth);
router.use(isMentor);

// Profile info
router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});

// Group info
router.get("/group", async (req, res) => {
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
    group,
  });
});

router.get("/extras", async (req, res) => {
  const weekDay = getWeekDay();
  const extrasInDay = await db.extra.findMany({
    where: {
      day: weekDay,
    },
  });
  res.status(200).json({ extras: extrasInDay });
});

router.post("/confirm", async (req, res) => {
  const { participations } = req.body;
  const created = [];
  for (let data of participations) {
    try {
      const participation = await db.participation.create({ data });
      created.push(participation);
    } catch (err) {}
  }
  res.status(200).json({ participations: created });
});

module.exports = router;
