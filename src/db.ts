import mongoose from "mongoose";
// db是数据库名称哦，没有的话会自动创建
const DB_ADDRESS = "mongodb://localhost:27017/db";

export async function connectDb() {
  mongoose.connect(DB_ADDRESS, function (err: any) {
    if (err) {
      console.error({ msg: "[Mongoose] database connect failed!", err });
    } else {
      console.log("[Mongoose] database connect success!");
    }
  });
}
