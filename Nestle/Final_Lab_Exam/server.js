const express = require("express");
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
let sitemiddleware = require("./middlewares/Site_middleware");
const bcrypt = require("bcrypt");

let server = express();

let Product = require("./models/product.model");
let User = require("./models/user.model");
let Order = require("./models/order.model");
const ordersRouter = require("./routes/admin/order.controller");
server.use(ordersRouter);

//use of method override for put request
const methodoverride = require("method-override");

//use of cookies
const cookies = require("cookie-parser");
server.use(cookies());

//use of session 
const session = require("express-session")
server.use(session({  secret: 'your-secret-key', 
  resave: false,    
  saveUninitialized: false}));
  server.use(sitemiddleware);

  server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");

server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.static("uploads"));

server.use(methodoverride("_method"))


  
let adminProductsRouter = require("./routes/admin/product.controller");
server.use(adminProductsRouter);

let adminCategoryRouter = require("./routes/admin/category.controller");
server.use(adminCategoryRouter);


let Authenticationmiddleware = require("./middlewares/Authentication_miidleware")


//To logout
server.get("/Logout", async(req,res)=>{
  req.session.user = null;
  return res.redirect("/Login");
})

//To Login
server.get("/Login", async(req,res)=>{
  return res.render("Authentication/Login");
})

server.post("/Login", async (req, res) => {
  let data = req.body;
  let user = await User.findOne({ email: data.email });
  if (!user) return res.redirect("/Register");
  const isvalid = await bcrypt.compare(data.password,user.password);
  if (!isvalid) return res.redirect("/Login");
  req.session.user = user;
  return res.redirect("/");
});

//To Register
server.get("/Register", async (req,res)=>{
  return res.render("Authentication/Registration");
});

server.post("/Register", async (req,res)=>{
  let data = req.body;
  let user = await User.findOne({email : data.email});
  if (user) return res.redirect("/Registration");
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password,saltRounds);
  user = new User(data);
  await user.save();
  return res.redirect("/Login");
});

//To cart
server.get("/cart",async (req, res) => {
  let cart=req.cookies.cart;
  cart = cart ?cart:[];
  let products = await Product.find({ _id: {$in: cart}});
  return res.render("cart",{products });
});

//To add to cart
server.get("/add-to-cart/:id", (req, res) => {
  let cart = req.cookies.cart;
  cart = cart ? cart : [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  return res.redirect("/");
});
//To remove from cart
server.post("/cart/remove/:id", (req, res) => {
  let cart = req.cookies.cart;
  cart = cart ? cart : [];
  cart = cart.filter(productId => productId !== req.params.id); // Remove the product by ID
  res.cookie("cart", cart); // Update the cart in cookies
  return res.redirect("/cart"); // Redirect back to the cart page
});

server.get("/Checkout",(req,res)=>{
  return res.render("Checkout");
});

server.get("/admin/order",(req,res)=>{
  return res.render("admin/order",{layout:"Admin_layout"})
})
//To Bootstrap
server.get("/", (req, res) => {
  return res.render("BOOTSTRAP"),{layout:false}
});




let adminMiddleware = require("./middlewares/Admin_middleware");
server.use("/", Authenticationmiddleware, adminMiddleware, adminProductsRouter);


//Connection to Database
let connectionString = "mongodb://127.0.0.1/nestle";
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to Mongo DB Server: " + connectionString))
  .catch((error) => console.log(error.message));

server.listen(5000, () => {
  console.log("Server Started at localhost:5000");
});