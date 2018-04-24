const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/receta");
module.exports = mongoose;
