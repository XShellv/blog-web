const Sequelize = require("sequelize");
const env = require("dotenv");
const conf = require("./config");

env.config();
const sequelize = new Sequelize(conf.database, conf.username, conf.password, {
  dialect: "mysql",
  host: conf.host,
});

module.exports = sequelize;
