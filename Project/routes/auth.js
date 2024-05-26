
let express = require("express");
let router = express.Router();
let User = require("../models/User");


router.get("/signup", (req, res) => {
  res.render("/signup");
});

router.post("/signup", async (req, res) => {
  let user = new User(req.body);
  await user.save();
  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ Email: req.body.Email });
  if (!user)
    return res.redirect("/signup");
  if (user.password != req.body.password) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/");
});



module.exports = router;
