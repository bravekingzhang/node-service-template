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
  .post(tokenController.getPath(`update`), tokenController.update)
  .get(tokenController.getPath(`selectAll`), tokenController.findAll);

router
  .post(questionController.getPath("upload"), questionController.upload)
  .post(questionController.getPath("download"), questionController.download)
  .get(questionController.getPath(`selectAll`), questionController.selectAll);

router.post(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    ctx.body = JSON.stringify({
      code: 0,
      message: "your token is valid",
    });
  }
);

router.post(userController.getPath(`login`), userController.login);
router.post(userController.getPath(`register`), userController.register);

export default router;
