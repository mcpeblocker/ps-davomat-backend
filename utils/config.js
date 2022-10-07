const config = {
  port: process.env.PORT,
  isProduction: process.env.NODE_ENV === "production",
  jwtSecret: process.env.JWT_SECRET,
  tokenCookieName: "ps-auth-token",
};

module.exports = config;
