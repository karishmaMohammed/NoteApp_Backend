const mongoose = require("mongoose");
require("dotenv").config();

 const connection = mongoose.connect(process.env.mongoUrl)
.then(() => console.log("Connected to MongoDB successfully"))
.catch((error) => console.error("Connection error:", error));

module.exports = {connection}