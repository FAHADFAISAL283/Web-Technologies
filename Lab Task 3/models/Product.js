
const mongoose = require("mongoose");

let ProductSchema = mongoose.Schema({
  name: String,
  price: String
});

let Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
