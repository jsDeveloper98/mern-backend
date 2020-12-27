const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Post", schema);
