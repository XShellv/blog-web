const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const About = sequelize.define("about", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  motto: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = About;
