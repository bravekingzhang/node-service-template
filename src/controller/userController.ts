import { User } from "../models";

import keys from "../config/key";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  prefix = "user";
  getPath(name: string): string {
    return `/${this.prefix}/${name}`;
  }
  async login(ctx: any, _next: any) {
    ctx.verifyParams({
      username: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { username, password } = ctx.request.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ _id: user._id, username }, keys.secretOrkey, {
        expiresIn: 3600,
      });
      ctx.status = 200;
      ctx.body = { token: "Bearer " + token };
    } else if (user) {
      ctx.status = 500;
      ctx.body = { error: "密码错误" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "用户名不存在" };
    }
  }
  async register(ctx: any, _next: any) {
    const { username, password } = ctx.request.body;
    const users = await User.find({ username });
    if (users.length > 0) {
      ctx.status = 500;
      ctx.body = { error: "用户名已被占用" };
    } else {
      await User.create({
        username,
        password: bcrypt.hashSync(password, keys.salt),
      })
        .then((user: any) => {
          ctx.body = user;
        })
        .catch((err: any) => {
          ctx.status = 500;
          ctx.body = { error: err };
        });
    }
  }
}

async function to(promise: any) {
  const result: any = [];
  try {
    result.shift(await promise);
  } catch (err) {
    result.shift(err);
  }
  return result;
}

export { UserController };
