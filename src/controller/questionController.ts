import { Question } from "../models";

class QuestionController {
  prefix = "question";
  getPath(name: string): string {
    return `/${this.prefix}/${name}`;
  }

  async selectAll(ctx: any, _next: any) {
    const data = await Question.find();
    ctx.response.body = JSON.stringify(data);
  }
  async upload(ctx: any, _next: any) {
    ctx.verifyParams({
      username: { type: "string", required: true },
      questions: { type: "string", required: true },
    });
    const { username, questions } = ctx.request.body;
    let question = await Question.findOne({ username }).exec();
    if (!question) {
      //初次同步逻辑
      question = await new Question({
        username,
        questions: questions,
      }).save();
      ctx.response.body = JSON.stringify({
        code: 0,
        message: "questions has been upload to cloud successfully",
      });
      return;
    }
    //表示云端落后于本地，需要更新
    const [err, data] = await to(
      Question.updateOne({ username }, { $set: { questions } }).exec()
    );
    if (err) return ctx.throw(500, err);
    ctx.response.body = JSON.stringify({
      code: 0,
      message: "questions has been upload to cloud successfully",
    });
  }
  async download(ctx: any, _next: any) {
    ctx.verifyParams({
      username: { type: "string", required: true },
    });
    const { username } = ctx.request.body;
    let question = await Question.findOne({ username }).exec();
    //表示云端落后于本地，需要更新
    ctx.response.body = JSON.stringify({
      code: 0,
      questions: question?.questions,
      message: "questions has been download from cloud successfully",
    });
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

export { QuestionController };
