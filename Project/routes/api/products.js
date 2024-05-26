
const express = require("express");
let router = express.Router();
let Product = require("../../models/Product");

router.post("/api/products", async function (req, res) {
  let data = req.body;
  let product = new Product(data);
  await product.save();
  res.send(product);
});
router.delete("/api/products/:id", async function (req, res) {
  let product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send("Record Not Found");
  res.send(product);
});
router.put("/api/products/:id", async function (req, res) {
  let product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Record Not Found");
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.send(product);
});
router.get("/api/products/:id", async function (req, res) {
  let product = await Product.findById(req.params.id);
  res.send(product);
});
router.get("/api/products", async function (req, res) {
  let products = await Product.find();
  res.send(products);
});

module.exports = router;
