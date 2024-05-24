
const express = require("express")
const mongoose = require("mongoose");
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

server.use(mainSiteMiddleware);
let productsAPIRouter = require("./routes/api/products");
const { cookie } = require("express/lib/response");
server.use(productsAPIRouter);

server.get('/', (req, res) => {
  res.render('layout');
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

server.get("/shopracket", checkAuth, async (req, res) => {
  res.render("shopracket");

});

server.get('/login', (req, res) => {
  res.render('login');
});

server.get('/signup', (req, res) => {
  res.render('signup');
});


server.get("/cart", checkAuth, async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let products = await Product.find({ _id: { $in: cart } });
  res.render("cart", { products });
});

server.use("/products", require("./routes/products"));
server.use("/", require("./routes/auth"));


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