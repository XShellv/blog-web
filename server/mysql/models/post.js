const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  abstract: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  post: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: "develop",
  },
  status: {
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: "draft",
  },
  auth: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  like: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  read: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Post;
