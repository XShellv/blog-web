const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Admin = sequelize.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = Admin;
