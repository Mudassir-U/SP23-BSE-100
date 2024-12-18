const express = require("express");
let router = express.Router();
let Product = require("../../models/product.model");
let Order= require("../../models/order.model");
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

router.get('/homepage',async(req, res) => {
      const products=await Product.find(); // Fetch all products from the database
      res.render('homepage', { layout:"product_layout",products }); // Pass products to EJS
});

//To products page
router.get("/admin/products/:page?", async (req, res) => {
  let page = req.params.page;
  page = page ? Number(page) : 1;
  let pageSize = 4;

  // Get search query and price filter from query parameters
  let searchQuery = req.query.search || ""; // Default to empty if no search
  let minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0; // Default to 0
  let maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Infinity; // Default to no upper limit

  // Create a filter object
  let filter = {
    price: { $gte: minPrice, $lte: maxPrice }, // Filter by price range
  };
  if (searchQuery) {
    filter.title = { $regex: searchQuery, $options: "i" }; // Case-insensitive search
  }

  router.get("/admin/orders", async (req, res) => {
    try {
      // Fetch all orders sorted by date in descending order
      const orders = await Order.find().sort({ orderDate: -1 });
  
      // Render the orders to the admin panel
      res.render("adminOrders", { layout: "Admin_layout", orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  server.get("/admin/order",(req,res)=>{
    return res.render("admin/order",{layout:"Admin_layout"})
  })

  // Get total records and filtered products
  let totalRecords = await Product.countDocuments(filter);
  let totalPages = Math.ceil(totalRecords / pageSize);
  let products = await Product.find(filter)
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  return res.render("admin/products", {
    layout: "Admin_layout",
    pageTitle: "Manage Your Products",
    products,
    page,
    pageSize,
    totalPages,
    totalRecords,
    searchQuery, // Pass search query back to the view
    minPrice, // Pass price filters to the view
    maxPrice,
  });
});

  module.exports = router;