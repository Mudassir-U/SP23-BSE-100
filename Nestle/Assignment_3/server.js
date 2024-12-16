const express = require("express");
var expressLayouts = require("express-ejs-layouts");
let server = express();
let router = express.Router();
server.set("view engine", "ejs");
server.set("views", __dirname + "/views");
server.use(expressLayouts);
server.use(express.static("public"));

server.get("/", (req, res) => {
  return res.render("BOOTSTRAP"),{layout:false}
});


server.get("/portfolio", (req, res) => {
  return res.render("portfolio"),{layout:false}
});

let expressrouter = require("./routes/product.controller");
server.use(expressrouter);

server.get("/admin/product/create", (req, res) => {
  res.render("admin/products_form", { 
    layout:"Admin_layout",
});
});

server.use("/", router);

server.listen(200, () => {
  console.log(`Server Started at localhost:200`);
});
