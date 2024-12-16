const mongoose = require("mongoose");
let categoryschema = mongoose.Schema(
    {
        title:String,
        description:String,
    }
);

let categorymodel = mongoose.model("Category",categoryschema);
module.exports = categorymodel;