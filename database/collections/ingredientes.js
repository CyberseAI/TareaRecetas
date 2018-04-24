const mongoose = require("../connect");
var ingredientSchema =
{
  name : String,
  kcal : Number,
  peso : Number
};
var ingrediente = mongoose.model("ingrediente",ingredientSchema);
module.exports = ingrediente;
