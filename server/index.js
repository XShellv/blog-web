const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const combineRouters = require("koa-combine-routers");
const session = require("koa-session");
const path = require("path");
const fs = require("fs");
const initdb = require("./mysql");
const { isAdmin } = require("./util/util");
const postRouter = require("./routes/post");
const aboutRouter = require("./routes/about");
const adminRouter = require("./routes/admin");
const commonRouter = require("./routes/common");
const auth = require("./config/auth");
const Store = require("./config/store");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const sess_key = "user";

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const nextRouter = new Router();

    // const options = {
    //   targets: {
    //     "/api/(.*)": {
    //       target: "http://localhost:8000",
    //       changeOrigin: true,
    //       pathRewrite: {
    //         "^/api": "",
    //       },
    //     },
    //   },
    // };

    // server.use(proxy(options));
    server.use(bodyParser());

    server.keys = ["xshellv is a programmer"];
    const SESSION_CONFIG = {
      key: sess_key,
      httpOnly: false,
      store: new Store(),
      maxAge: 15 * 24 * 60 * 60 * 1000,
    };
    server.use(session(SESSION_CONFIG, server));

    server.use(async (ctx, next) => {
      if (ctx.headers.cookie) {
        const cookie = ctx.cookies.get(sess_key);
        const store = new Store();
        const values = await store.get(cookie);
        if (ctx.session.admin) {
          ctx.state.isAdmin = true;
        }
        // if (values && isAdmin(values.userInfo)) {
        //   ctx.state.isAdmin = true;
        //   // ctx.session.userInfo = values.userInfo;
        // }
      }
      await next();
    });

    // server.use(async (ctx, next) => {
    //   const path = ctx.path;
    //   const method = ctx.method;
    //   if (path === "/user/info" && method === "GET") {
    //     const user = ctx.session.userInfo;
    //     ctx.set("Content-Type", "application/json");
    //     ctx.body = user;
    //   } else {
    //     await next();
    //   }
    // });

    // 配置处理github OAuth的登录
    auth(server);

    nextRouter.get("/article/:id", async (ctx) => {
      const id = ctx.params.id;
      await handle(ctx.req, ctx.res, {
        pathname: "/article",
        query: {
          id,
        },
      });
      ctx.respond = false;
    });

    nextRouter.all("*", async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    const router = combineRouters(
      postRouter,
      aboutRouter,
      commonRouter,
      adminRouter,
      nextRouter
    );
    server.use(router());

    initdb().then(async (result) => {
      console.log("> sync models successfully...");
      server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
      server.on("error", function (err) {
        console.log(err);
      });
    }).catch(e=>{
      console.log(e)
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
