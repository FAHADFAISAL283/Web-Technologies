const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const roleCheck = require("../middlewares/check-role");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    cb(null, uploadsDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });


router.get("/new", roleCheck, (req, res) => {
  res.render("products/new");
});


router.post("/new", roleCheck, upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => "/uploads/" + file.filename);
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      isFeature: req.body.isFeature === 'on',  
      images: imagePaths
    };
    let product = new Product(productData);
    await product.save();
    return res.redirect("/products");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error creating product");
  }
});


router.get("/delete/:id", roleCheck, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.redirect("/products");
});


router.get("/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart || [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  return res.redirect("/products");
});


router.get("/edit/:id", roleCheck, async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("products/edit", { product });
});


router.post("/edit/:id", roleCheck, upload.array("images", 5), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.isFeature = req.body.isFeature === 'on'; 
    if (req.files.length > 0) {
      const imagePaths = req.files.map(file => "/uploads/" + file.filename);
      product.images = imagePaths;
    }
    await product.save();
    return res.redirect("/products");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error editing product");
  }
});


router.get("/:page?", async (req, res) => {
  let pageTitle = "List of All products";
  let page = req.params.page || 1;
  let pageSize = 6;
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
