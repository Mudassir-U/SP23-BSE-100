const express = require("express");
let router = express.Router();
let Category = require("../../models/category.model");




//To Create new Category
router.get("/admin/category/create",(req,res)=>{
  res.render("admin/category_page",{layout:"category_layout"});
})

router.post("/admin/category/create", async (req,res)=>{
  let newcategory = new Category(req.body);
  await newcategory.save();
   return res.redirect("/admin/category");
});


//To edit category
router.get("/admin/category/edit/:id", async (req,res)=>{
  let category = await Category.findById(req.params.id);
  res.render("admin/category_edit_page",
    {layout:"category_layout",category})
});

router.put("/admin/category/edit/:id" , async (req,res)=>{
  let category = await Category.findById(req.params.id);
  category.title = req.body.title;
  category.description = req.body.description;
  await category.save();
  return res.redirect("/admin/category");
});


//To delete category
router.get("/admin/category/delete/:id", async (req,res)=>{
let category = await Category.findByIdAndDelete(req.params.id);
return res.redirect("/admin/category")
});



//To category page
router.get("/admin/category", async (req,res)=>{
  let category = await  Category.find();
  return res.render("admin/category",{
     layout:"category_layout",
     pageTitle:"Manage Your categories",
     category,
  });
});

  module.exports = router;