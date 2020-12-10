const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const queryInterface = sequelize.getQueryInterface()

const addCol = () => {
    queryInterface.addColumn("admins", "avatar", {
        type: Sequelize.STRING(100),
        allowNull: false,
    })
}
addCol()