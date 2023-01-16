import { Token } from "../models";

class TokenController {
  prefix = "token";
  getPath(name: string): string {
    return `/${this.prefix}/${name}`;
  }
  async add(ctx: any, _next: any) {
    ctx.verifyParams({
      userId: { type: "string", required: true },
      token: { type: "string", required: true },
    });
    const { userId, token } = ctx.request.body;
    const [err, data] = await to(new Token({ token, userId }).save());
    if (err) return ctx.throw(500, err);
    ctx.response.body = data;
  }
  async find(ctx: any, _next: any) {
    ctx.verifyParams({
      userId: { type: "string", required: true },
    });
    const { userId } = ctx.request.body;
    const data = await Token.findOne({ $set: { userId } });
    ctx.response.body = JSON.stringify(data);
  }
  async delete(ctx: any, _next: any) {
    ctx.verifyParams({
      userId: { type: "string", required: true },
    });
    const { userId } = ctx.request.body;
    const data = await Token.deleteOne({ userId: userId });
    ctx.response.body = data;
  }
  async update(ctx: any, _next: any) {
    ctx.verifyParams({
      token: { type: "string", required: true },
      userId: { type: "array", required: true },
    });
    const { token, userId } = ctx.request.body;
    const [err, data] = await to(
      Token.updateOne({ userId }, { $set: { token } })
    );
    if (err) return ctx.throw(500, err);
    ctx.response.body = data;
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

export { TokenController };
