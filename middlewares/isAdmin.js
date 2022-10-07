module.exports = (req, res, next) => {
  if (req.user?.role === "ADMIN") return next();
  return res
    .status(403)
    .json({ message: "You don't have permission for here." });
};
