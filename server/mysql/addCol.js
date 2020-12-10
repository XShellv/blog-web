const sequelize = require("./util/database");
const Sequelize = require("sequelize");
const queryInterface = sequelize.getQueryInterface();

const up = function () {
  return Promise.all([
    queryInterface.addColumn("tags", "status", {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: "draft",
    }),
  ]);
};

up()