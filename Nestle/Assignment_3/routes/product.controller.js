const express = require("express");
let router =express.Router();

router.get("/admin/product",(req,res)=>{
let products = [
{
    "id":1,
    title:"Apple Juice",
    price:5.99
},
{
    "id":2,
    title:"Mango  Juice",
    price:5.95
}
];
return res.render("admin/product",{
    layout:"Admin_layout",
    pageTitle: "Manage Products",
    products,
});
});
module.exports = router;