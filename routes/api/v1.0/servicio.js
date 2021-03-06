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
router.path(/receta\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var recipe = {};
  for(var i=0;i<keys.length;i++
  {
    recipe[keys[i]]=req.body[keys[i]];
  }
  receta.findOneAndUpdate({_id: id}, recipe, (err, params) => {
    if(err)
    {
      res.status(500).json({
        "msn" : "Error no se pudo actualizar los datos"
      }):
    }
    res.status(200).json(params);
    return;
  });
});

//actualizar el campo de una receta
router.put(/receta\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'descripcion', 'ingrediente'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmentode la informacion"
    });
    return;
  }

  var recipe = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingrediente : req.body.ingrediente
  };
  Recipe.findOneAndUpdate({_id: id}, recipe, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

//Añadir ingrediente
router.post("/ingredients", (req, res) => {
  var ingredient = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };

  var ingredientData = new Ingredient(ingredient);

  ingredientData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "Ingrediente registrado con exito "
    });
  });
});

//lectura de ingredientes
router.get("/ingredients", (req, res, next) => {
  Ingredient.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

// Lectura de un solo ingrediente
router.get(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredient.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el ingrediente"
    });
  })
});

//eliminacion de  ingrediente
router.delete(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredient.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});


//Actualización de todos los campos de un ingrediente
router.put(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'kcal', 'peso'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmentode la informacion"
    });
    return;
  }

  var ingredient = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };
  Ingredient.findOneAndUpdate({_id: id}, ingredient, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});
module.exports = router;
