const express = require("express");
var expressLayouts = require("express-ejs-layouts");
let server = express();
server.set("view engine", "ejs");
server.set("views", __dirname + "/views");
//server.use(expressLayouts);
server.use(express.static("public"));



server.get("/", (req, res) => {
  return res.render(__dirname+"/views/BOOTSTRAP");
});

server.get("/portfolio", (req, res) => {
  return res.render(__dirname+"/views/portfolio");
});

server.listen(2000, () => {
  console.log(`Server Started at localhost:2000`);
});