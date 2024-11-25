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


router.get('/Admin', (req,res) =>{
  console.log("Admin Accessed.")
  return res.render('admin/Form-page'),{layout:Admin_layout}
});

server.use("/", router);

server.listen(2000, () => {
  console.log(`Server Started at localhost:2000`);
});
