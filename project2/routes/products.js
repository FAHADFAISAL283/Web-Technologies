
let express = require("express");
let router = express.Router();
let Product = require("../models/Product");
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


router.post("/new", roleCheck,upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => "/uploads/" + file.filename);
    let pro = new Product({
      name: req.body.name,
      price: req.body.price,
      images: imagePaths
    });
    await pro.save();
    return res.redirect("/products");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error creating product");
  }
});

router.get("/delete/:id", roleCheck, async (req, res) => {
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

router.get("/edit/:id", roleCheck,async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("products/edit", { product });
});
router.post("/edit/:id", roleCheck, async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.redirect("/products");
});

router.get("/:page?", async (req, res) => {
  let pageTitle = "List of All products";

  let page = req.params.page ? req.params.page : 1;
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
