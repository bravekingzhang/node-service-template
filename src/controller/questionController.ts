import { Question } from "../models";

class QuestionController {
  prefix = "question";
  getPath(name: string): string {
    return `/${this.prefix}/${name}`;
  }
  async sync(ctx: any, _next: any) {
    ctx.verifyParams({
      version: { type: "int", required: true },
      questions: { type: "string", required: true },
    });
    const { version, questions } = ctx.request.body;
    let question = await Question.findOne();
    if (!question) {
      question = await new Question({ version: 0, questions: "[]" }).save();
    }
    if (question.version > version) {
    } else if (question.version == version) {
    } else {
    }

    // const [err, data] = await to(new Question({ token, userId }).save());
    // if (err) return ctx.throw(500, err);
    // ctx.response.body = data;
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
