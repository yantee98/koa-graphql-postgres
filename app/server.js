const Koa = require("koa");
const Router = require("koa-router");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const dbSetup = require("./db-setup");
const config = require("./config");
const { modules } = require("./routes");

(async () => {
  let app = new Koa();
  app.use(cors({ origin: "*" }));
  app.use(json());
  app.use(bodyParser());

  // attach routes
  let router = new Router();
  for (let mod of modules) {
    await mod.attach(router, app);
  }

  app.use(router.routes()).use(router.allowedMethods());

  app.on("error", err => console.error(err));

  let port = config.server.port;
  console.log(`Listening on port  ${port}`);
  dbSetup().then(({ adminToken }) => {
    console.log(`admin access token: ${adminToken}`);
  });

  app.listen(port);
})();
