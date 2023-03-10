const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

export const User = model("User", UserSchema);
