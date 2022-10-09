const jwt = require("jsonwebtoken");
const db = require("../database");
const config = require("../utils/config");

module.exports = async (req, res, next) => {
  const bearer = req.header("Authorization");
  if (!bearer?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You must be authorized. " });
  }
  const token = bearer.substring(7, bearer.length);
  if (!token) {
    return res.status(401).json({ message: "You must be authorized." });
  }
  const { userId } = jwt.verify(token, config.jwtSecret);
  if (!userId) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(401).json({ message: "Authorized user not found." });
  }
  delete user.password;
  req.user = user;
  next();
};
