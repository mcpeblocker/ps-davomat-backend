const app = require("../server");

const routes = {
  auth: require("./auth"),
  mentor: require("./mentor"),
  teacher: require("./teacher"),
  admin: require("./admin"),
};

for (let key of Object.keys(routes)) {
  app.use(`/${key}`, routes[key]);
  console.log(`Route initialized: /${key}`);
}
