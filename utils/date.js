const getWeekDay = () => {
  const date = new Date();
  const weekDay = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(date)
    .toUpperCase();
  return weekDay;
};

const getHour = () => {
  const date = new Date();
  return date.getHours();
};

const getMinute = () => {
  const date = new Date();
  return date.getMinutes();
};

module.exports = {
  getWeekDay,
  getHour,
  getMinute,
};
