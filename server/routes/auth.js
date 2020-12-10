/**
 * github授权登录处理
 */
const Router = require("koa-router");
const authRouter = new Router();
const axios = require("axios");
const config = require("../config/config");

const { client_id, client_secret, request_token_url } = config.github;

authRouter.get("/preapre-auth", async (ctx, next) => {
  const { url } = ctx.query;
  ctx.session.urlBeforeOAuth = url;
  ctx.redirect(config.github.GET_OAUTH_URL());
});


authRouter.get("/auth", async (ctx, next) => {
  const code = ctx.query.code;
  if (!code) {
    ctx.body = "code not exist";
    return;
  }
  const result = await axios({
    method: "POST",
    url: request_token_url,
    data: {
      client_id,
      client_secret,
      code,
    },
    headers: {
      Accept: "application/json",
    },
  });

  if (result.status === 200 && result.data && !result.data.error) {
    const { access_token, token_type } = result.data;
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        accept: "application/json",
        Authorization: `token ${access_token}`,
      },
    });
    // ctx.body = data;
    // 判断是否是管理员
    if (data.id !== 45475139) {
      ctx.status = 401;
      ctx.body = "No Auth!";
    } else {
      ctx.session.userInfo = data;
      ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || "/");
      ctx.session.urlBeforeOAuth = "";
    }
  } else {
    const errorMsg = result.data && result.data.error;
    ctx.body = `request token failed ${errorMsg}`;
  }
});


module.exports = authRouter;
