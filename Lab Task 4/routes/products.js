
let express = require("express");
let router = express.Router();
let Product = require("../models/Product");

router.get("/new", (req, res) => {
  res.render("products/new");
});

router.post("/new", async (req, res) => {
  let pro = new Product(req.body);
  await pro.save();
  return res.redirect("/products");
});

router.get("/delete/:id", async (req, res) => {
  let pro = await Product.findByIdAndDelete(req.params.id);
  return res.redirect("/products");
});
router.get("/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);

  return res.redirect("/products");
});

router.get("/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("products/edit", { product });
});
router.post("/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.address;
  await product.save();
  return res.redirect("/products");
});

router.get("/:page?", async (req, res) => {
  let pageTitle = "List of All products";

  let page = req.params.page ? req.params.page : 1;
  let pageSize = 3;
  let skip = (page - 1) * pageSize;
  let total = await Product.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  let products = await Product.find().limit(pageSize).skip(skip);
  
  return res.render("products/list", {
    pageTitle,
    products,
    page,
    pageSize,
    total,
    totalPages,
  });
});

module.exports = router;
