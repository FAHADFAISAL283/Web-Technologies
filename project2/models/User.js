const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: String,
  Email: String,
  password: String,
  role: { type: String, default: 'user' }
});

let User = mongoose.model("User", userSchema);

module.exports = User;
