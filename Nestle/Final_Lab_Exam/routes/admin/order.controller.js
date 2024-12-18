const express = require("express");
const router = express.Router();
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
const mongoose = require("mongoose");

// Checkout POST route
router.post("Checkout", async (req, res) => {
    try {
      const cartItems = req.cookies.cart || [];
      const { name, email, number, address, paymentMethod, orderDate } = req.body;
      const productIds = cartItems.map(item => {
        if (mongoose.Types.ObjectId.isValid(item)) {
          return new mongoose.Types.ObjectId(item);
        } else {
          console.error("Invalid productId:", item);
          return null;
        }
      }).filter(id => id !== null);
  
      if (productIds.length === 0) {
        return res.status(400).json({ message: "No valid products in the cart" });
      }
      const products = await Product.find({ _id: { $in: productIds } });
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found in the database" });
      }
  
      // Create a new order
      const newOrder = new Order({
        name,
        email,
        number,
        address,
        paymentMethod,
        date: orderDate, // Add the date field
        products: products.map(product => ({
          productId: product._id,
          title: product.title,
        })),
      });
  
      // Save the order to the database
      await newOrder.save();
  
      // Clear the cart and redirect
      res.clearCookie("cart");
      res.redirect("/BOOTSTRAP");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error placing order"});
 }
  });

// Admin orders GET route
router.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 }); // Get all orders, sorted by most recent
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
