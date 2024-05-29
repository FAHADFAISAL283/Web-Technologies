const express = require("express");
let router = express.Router();
let Product = require("../../models/Product");

// Create a new product
router.post("/api/products", async function (req, res) {
  try {
    let data = req.body;
    let product = new Product(data);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a product by ID
router.delete("/api/products/:id", async function (req, res) {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Record Not Found");
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product by ID
router.put("/api/products/:id", async function (req, res) {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Record Not Found");
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.isFeature = req.body.isFeature;
    product.images = req.body.images;
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a product by ID
router.get("/api/products/:id", async function (req, res) {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Record Not Found");
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all products
router.get("/api/products", async function (req, res) {
  try {
    let products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
