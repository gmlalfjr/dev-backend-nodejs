const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeModel = new Schema({
  fullName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  idCard: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "id",
    required: true
  }
});

module.exports = mongoose.model("employee", EmployeeModel);
