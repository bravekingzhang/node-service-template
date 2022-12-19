import Router from "koa-router";

import TokenController from "../controller";

const tokenController = new TokenController();
const router = new Router({
  prefix: "/api",
});

router
  .post(tokenController.getPath("add"), tokenController.add)
  .get(tokenController.getPath(`select`), tokenController.find)
  .post(tokenController.getPath(`remove`), tokenController.delete)
  .post(tokenController.getPath(`update`), tokenController.update);

export default router;
