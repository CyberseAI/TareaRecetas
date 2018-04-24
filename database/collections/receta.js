const mongoose = require("../connect");
var foodSchema =
{
  name : String,
  descipcion : String,
  ingrediente : Array
};
var food = mongoose.model("food",foodSchema);
module.exports = food;
