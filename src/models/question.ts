import { Schema, model } from "mongoose";

// 数据模型
const QuestionSchema = new Schema({
  username: { type: String, unique: true },
  questions: { type: String, required: true },
});
// QuestionSchema.index({ version: 1, username: 1 }, { unique: true });
export const Question = model("Question", QuestionSchema);
