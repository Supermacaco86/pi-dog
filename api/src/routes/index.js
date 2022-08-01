const { Router } = require('express');
const { postDog, getDogs, getDogById,  putDog, deleteDog, getDogsfitered } = require("../Controllers/dogs")
const { getTemp } = require("../Controllers/temps")
const {Dog, Temp} = require ("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/dogs", getDogs);
router.get("/filter/:existent", getDogsfitered);
router.get("/temps", getTemp);
router.get("/dogs/:id", getDogById );
router.post("/dogs", postDog);
router.put("/edit/:id", putDog);
router.delete("/delete/:id", deleteDog)


module.exports = router;

