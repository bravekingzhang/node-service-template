import { Schema, model } from "mongoose";

// 数据模型
const QuestionSchema = new Schema({
  version: { type: Number, required: true, unique: true },
  questions: { type: String, required: true },
});
export const Question = model("Question", QuestionSchema);
