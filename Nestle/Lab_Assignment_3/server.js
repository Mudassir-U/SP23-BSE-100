const express = require("express");
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
const methodoverride = require("method-override");

let server = express();

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");

server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.static("uploads"));

server.use(methodoverride("_method"))

server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  return res.render("BOOTSTRAP"),{layout:false}
});


let adminProductsRouter = require("./routes/admin/product.controller");
server.use(adminProductsRouter);

let adminCategoryRouter = require("./routes/admin/category.controller");
server.use(adminCategoryRouter);

server.get("/", async (req, res) => {
  let Product = require("./models/product.model");
  let products = await Product.find();
  let Category = require("./models/category.model");
  let categories= await Category.find();
  return res.render("homepage", { products,categories });
});

let connectionString = "mongodb://127.0.0.1/nestle";
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to Mongo DB Server: " + connectionString))
  .catch((error) => console.log(error.message));

server.listen(2000, () => {
  console.log(`Server Started at localhost:2000`);
});


