const mongoose = require("mongoose");
let userschema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role: { type: String, default: "user" },
})
let usermodel = mongoose.model("User",userschema);
module.exports = usermodel;