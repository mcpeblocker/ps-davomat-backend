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

module.exports = router;
