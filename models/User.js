const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  date: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("user", UserSchema);

module.exports = model;
