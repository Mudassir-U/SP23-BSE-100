const mongoose = require("mongoose");
let productschema = mongoose.Schema(
    {
        title:String,
        price:Number,
        description:String,
        picture:String,
    }
);

let productmodel = mongoose.model("Product",productschema);
module.exports = productmodel;