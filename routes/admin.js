const express = require("express");
const db = require("../database");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const { getWeekDay, getHour } = require("../utils/date");

const router = express.Router();

router.use(auth);
router.use(isAdmin);

// Profile info
router.get("/me", (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/students", async (req, res) => {
  const weekDay = getWeekDay();
  const students = await db.student.findMany({
    select: {
      name: true,
      class: {
        include: {
          extras: {
            where: {
              day: weekDay,
            },
          },
        },
      },
    },
  });
  res.status(200).json({ students });
});

router.get("/participations", async (req, res) => {
  const participations = await db.participation.findMany({
    include: {
      student: {
        include: {
          class: true,
        },
      },
      extra: {
        include: {
          class: true,
        },
      },
      createdBy: true,
    },
  });
  res.status(200).json({ participations });
});

module.exports = router;
