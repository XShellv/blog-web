const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const adminRouter = new Router();
const model = require("../mysql/models");
const Sequelize = require("sequelize");
const sequelize = require("../mysql/util/database");

/**
 * 管理员登录
 */
adminRouter.post("/login", async (ctx, next) => {
  const body = ctx.request.body;
  const ret = await model.Admin.findOne({
    where: {
      ...body,
    },
  });
  if (ret) {
    ctx.session.admin = ret;
    ctx.body = {
      success: true,
      code: 0,
      data: {
        username: ret.username,
        avatar: ret.avatar,
      },
      message: "登录成功！",
    };
  } else {
    ctx.body = {
      success: false,
      code: 1,
      message: "用户名或密码不正确！",
    };
  }
});

adminRouter.get("/admin/info", async (ctx, next) => {
  if (ctx.session.admin) {
    const { username, avatar } = ctx.session.admin;
    //   ctx.set("Content-Type", "application/json");
    ctx.body = {
      success: true,
      code: 0,
      data: {
        username,
        avatar,
      },
    };
  }else{
    ctx.status = 401;
    ctx.body = {}
  }
});

adminRouter.get("/logout", async (ctx, next) => {
    const { url } = ctx.query;
    ctx.session = null;
    ctx.redirect(url || "/");
  });

module.exports = adminRouter;
