const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const aboutRouter = new Router();
const model = require("../mysql/models");
const Sequelize = require("sequelize");
const sequelize = require("../mysql/util/database");

/**
 * 创建或更新关于我
 */
aboutRouter.post("/me", async (ctx, next) => {
  const body = ctx.request.body;
  const ret = await model.About.upsert({
    id: 1,
    ...body,
  });
  if (ret) {
    ctx.body = {
      success: true,
    };
  } else {
    ctx.body = {
      success: false,
      message: "update about me info fail!",
    };
  }
});

/**
 * 获取关于我
 */
aboutRouter.get("/me", async (ctx, next) => {
  let ret = await model.About.findByPk(1);
  if (!ret) {
    ret = {};
    ret.content = "";
    ret.motto = "";
  }
  ctx.body = {
    success: true,
    data: ret,
  };
});

module.exports = aboutRouter;
