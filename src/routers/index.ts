import Router from "koa-router";
const passport = require("koa-passport");

import {
  TokenController,
  QuestionController,
  UserController,
} from "../controller";

const tokenController = new TokenController();
const questionController = new QuestionController();
const userController = new UserController();
const router = new Router({
  prefix: "/api",
});

router
  .post(tokenController.getPath("add"), tokenController.add)
  .get(tokenController.getPath(`select`), tokenController.find)
  .post(tokenController.getPath(`remove`), tokenController.delete)
  .post(tokenController.getPath(`update`), tokenController.update);

router.post(questionController.getPath("sync"), questionController.sync);

router.post(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    ctx.body = "auth";
  }
);

router.post(userController.getPath(`login`), userController.login);
router.post(userController.getPath(`register`), userController.register);

export default router;
