import { Schema, model } from "mongoose";

// 数据模型
const TokenSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId, // set type to ObjectId
    auto: true,
  }, // enable auto increment
  token: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
});
export const Token = model("Token", TokenSchema);
