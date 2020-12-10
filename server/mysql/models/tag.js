const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Tag = sequelize.define("tag", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  auth: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: "draft",
  },
});

module.exports = Tag;
