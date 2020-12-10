const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const commonRouter = new Router();
const model = require("../mysql/models");
const Sequelize = require("sequelize");
const sequelize = require("../mysql/util/database");

/**
 * 获取数量最多的前10标签
 */
commonRouter.post("/topTags", async (ctx, next) => {
  const body = ctx.request.body;
  const { state } = ctx;
  let where = { status: "post" };
  if (!state || !state.isAdmin) {
    where.auth = 0;
  } else {
    where[Sequelize.Op.or] = [{ auth: 0 }, { auth: 1 }];
  }

  const ret = await model.Tag.findAll({
    attributes: [[sequelize.fn("COUNT", "name"), "count"], "name"],
    group: "name",
    plain: false,
    raw: true,
    where,
    order: [[sequelize.fn("COUNT", "name"), "DESC"]],
    limit: body.top || 10,
  });
  if (ret) {
    ctx.body = { success: true, data: ret };
  } else {
    ctx.body = { success: false, message: "query tags error" };
  }
});

module.exports = commonRouter;
