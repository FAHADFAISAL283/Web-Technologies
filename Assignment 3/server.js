const express = require("express")
let server = express();
server.use(express.json());
server.set("view engine", "ejs");


server.use(express.static("public"));



server.get('/', (req, res) => {
  res.render('layout', { pageTitle: 'Home Page' });
});

server.get('/contact-us', (req, res) => {
  res.render('contact-us', { pageTitle: 'Contact-Us' });
});

server.get('/review', (req, res) => {
  res.render('review', { pageTitle: 'Add a Review' });
});

server.listen(4000, () => {
    console.log("Server started listening at localhost:4000");
  });