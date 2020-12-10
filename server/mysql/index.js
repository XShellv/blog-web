module.exports = () => {
  const sequelize = require("./util/database");
  const model = require("./models");

  model.Post.belongsToMany(model.Tag, {
    onDelete: "cascade",
    through: model.PostTag,
  });

  model.Tag.belongsToMany(model.Post, {
    onDelete: "cascade",
    through: model.PostTag,
  });
  return sequelize.sync({ force: false });
};
