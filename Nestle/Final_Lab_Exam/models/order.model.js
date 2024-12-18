const mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  name: String,
  street: String,
  city: String,
  Postalcode: Number,
  phone:Number,
  products: [
    {productId: {type: mongoose.Schema.Types.ObjectId,ref: 'Product',},
    title: { type:String } 
    },
],
  date: { type: Date, default: Date.now } 
});
let OrderModel = mongoose.model("Order", orderSchema);
module.exports=OrderModel;