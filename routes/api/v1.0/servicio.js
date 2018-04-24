var express = require('express');
var router = express.Router();
var _=require("underscore");

var receta = require("../../../../../database/collections/receta");
var ingrediente = require("../../../../../database/collections/receta");


//creacion de la receta
router.post("/recetas",(req, res) => {
  var receta = {
    name : req.body.name,
    descipcion : req.body.descipcion,
    ingrediente : req.body.ingrediente
  };
  var recetaDato = new receta(receta);
  res.status.save(200).json({
    "msn" : "Receta guardada"
  });
});

//leer recetas
router.get("/receta", (req, res) => {
  receta.find({}).exec((error, docs) =>{
    console.log(docs)
    res.status(200).json(docs);
  });
});

//leer receta individual
router.get(/receta\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(url.split("/"))
  receta.findOne({_id : id}).exec((error, docs) => {
    if(docs == null)
    {
      res.status(200).json(docs);
      return;
    }
    res.status(200).json({
      "msn" : "No existe receta"
    });
  })
});

//eleiminacion de receta
router.delete(/receta\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  receta.find({_id : id}).remove().exec((error, docs) =>{
    res.status(200).json(docs);
  })
});

//actualizar receta
module.exports = router;
