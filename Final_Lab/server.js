
const express = require("express")
const mongoose = require("mongoose");
const path = require("path")
const fs = require("fs")
let server = express();
let Product = require("./models/Product");
server.use(express.json());
server.set("view engine", "ejs");
server.use(express.urlencoded());
let cookieParser = require("cookie-parser");
let expressSession = require("express-session");
let mainSiteMiddleware = require("./middlewares/main-site");
let checkAuth = require("./middlewares/check-auth");

server.use(cookieParser());
server.use(expressSession({ secret: "My Secret Key" }));

server.use(express.static("public"));
let productsAPIRouter = require("./routes/api/products");
server.use(mainSiteMiddleware);
const { cookie } = require("express/lib/response");
server.use(productsAPIRouter);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

//server.get('/', (req, res) => {
  //res.render('layout');
//});

server.get('/', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeature: true }).limit(5);
    res.render('layout', { products: featuredProducts });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).send("Internal Server Error");
  }
});

server.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    if (!req.session.visitedProducts) {
      req.session.visitedProducts = [];
    }
    if (!req.session.visitedProducts.includes(req.params.id)) {
      req.session.visitedProducts.push(req.params.id);
    }

    res.render('product', { product, user: req.session.user });
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).send('Error retrieving product');
  }
});

server.get('/visited-products', async (req, res) => {
  try {
    const visitedProductIds = req.session.visitedProducts || [];
    const visitedProducts = await Product.find({ _id: { $in: visitedProductIds } });
    res.render('visit', { visitedProducts, user: req.session.user });
  } catch (error) {
    console.error('Error retrieving visited products:', error);
    res.status(500).send('Error retrieving visited products');
  }
});


server.get('/contact-us', checkAuth, async(req, res) => {
  res.render('contact-us');
});

server.get('/review', checkAuth, async(req, res) => {
  res.render('review');
});

server.get("/shopbat", checkAuth, async (req, res) => {
  res.render("shopbat");
  
});

server.get("/shopball", checkAuth, async(req, res) => {
  res.render("shopball");
  
});

server.get("/shopracket", checkAuth,async (req, res) => {
  res.render("shopracket");

});

server.get('/login', (req, res) => {
  res.render('login');
});

server.get('/signup', (req, res) => {
  res.render('signup');
});


server.get("/cart", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let products = await Product.find({ _id: { $in: cart } });
  res.render("cart", { products });
});

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

server.use("/products", checkAuth,require("./routes/products"));
server.use("/", require("./routes/auth"));

server.get("/order",  async (req, res) => {
  res.render("order");
});


server.listen(4000, () => {
    console.log("Server started listening at localhost:4000");
  });
  mongoose
  .connect("mongodb://localhost:27017/FA21-BCS-124")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });

