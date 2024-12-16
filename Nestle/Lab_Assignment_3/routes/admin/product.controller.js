const express = require("express");
let router = express.Router();
let Product = require("../../models/product.model");
let multer = require("multer");

const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,"./uploads");
  },
  filename : function(req,file,cb){
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({storage : storage});
//To Create new Product
router.get("/admin/products/create",(req,res)=>{
  res.render("admin/Product_page",{layout:"Admin_layout"});
})

router.post("/admin/products/create",upload.single("file"), async (req,res)=>{
  let newproduct = new Product(req.body);
  if(req.file){
   newproduct.picture=req.file.filename;
  }
  await newproduct.save();
   return res.redirect("/admin/products");
});


//To edit Product
router.get("/admin/products/edit/:id", async (req,res)=>{
  let product = await Product.findById(req.params.id);
  res.render("admin/Product_edit_page",
    {layout:"Admin_layout",product})
});

router.put("/admin/products/edit/:id" , async (req,res)=>{
  let product = await Product.findById(req.params.id);
  product.title = req.body.title;
  product.description = req.body.description;
  product.price = req.body.price;
  await product.save();
  return res.redirect("/admin/products");
});


//To delete product
router.get("/admin/products/delete/:id", async (req,res)=>{
let product = await Product.findByIdAndDelete(req.params.id);
return res.redirect("/admin/products")
});



//To products page
router.get("/admin/products/:page?", async (req,res)=>{
  let page = req.params.page;
  page = page ? Number(page) : 1;
  let pagesize = 4;
  let totalrecords = await Product.countDocuments();
  let totalpages = Math.ceil(totalrecords/pagesize);
  let products = await  Product.find()
  .limit(pagesize)
  .skip((page-1)*pagesize);
  return res.render("admin/products",{
     layout:"Admin_layout",
     pageTitle:"Manage Your Products",
     products,
     page,
     pagesize,
     totalpages,
     totalrecords,
  });
});

  module.exports = router;