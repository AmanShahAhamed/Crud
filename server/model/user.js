const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  name: { type: String, require: true },
  salary: { type: Number, require: true },
  designation: { type: String, require: true },
});

const Emp = mongoose.model("User", empSchema);
module.exports = Emp;
