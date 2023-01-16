import { Schema, model } from "mongoose";

// 数据模型
const QuestionSchema = new Schema({
  question: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
});
export const Question = model("Question", QuestionSchema);
