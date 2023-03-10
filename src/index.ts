const Koa = require("koa");
const parameter = require("koa-parameter");
const bodyparser = require("koa-bodyparser");
const error = require("koa-json-error");
const passport = require("koa-passport");
const app = new Koa();
import { connectDb } from "./db";
import router from "./routers";

import authWrap from "./auth";

// 建立数据库连接
connectDb();

authWrap(passport);
app.use(passport.initialize());

app.use(parameter(app));
app.use(bodyparser());
// 这个是json错误处理，可以自动抛出http status 422
app.use(error({ postFormat: (e: any, obj: any) => ({ obj }) }));
app.use(router.routes());

app.listen(3000);
