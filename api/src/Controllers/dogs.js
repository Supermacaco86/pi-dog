const axios = require("axios");
const { Dog, Temp } = require("../db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { API_KEY } = process.env;

const getApiDogs = async () => {
  try {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiUrl.data.map((e) => {
      if(e.life_span.includes('-')) {
        var lifeMin = e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0];
        var lifeMax = e.life_span.split(" - ")[1] && e.life_span.split(" - ")[1].split(" ")[0]
      }else {
        var life = e.life_span.split(' ')[0]
      }
      return {
        id: e.id,
        name: e.name,
        height_min:
          e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
        height_max:
          e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
        weight_min:
          e.weight.metric.split(" - ")[0] && e.weight.metric.split(" - ")[0],
        weight_max:
          e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
        life_span: life? life : 'de ' + lifeMin + ' a ' + lifeMax ,
        temp: e.temperament ? e.temperament : "Temperamento no encontrado",
        image: e.image.url?e.image.url:"Imagen no encontrada",
      };
    });

    return apiInfo ;
  } catch (error) {
    return error;
  }
};

const getDbDogs = async () => {
  try {
    const dbInfo = await Dog.findAll({
      include: {
        model: Temp,
        attributes: ["name"],
        through: {
          //conprobacion de que trae "name" mediante los "attributes"
          attributes: [],
          
        },
      },
    });console.log(dbInfo)
    const dbDog = await dbInfo.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height_min: e.height_min,
        height_max: e.height_max,
        weight_min: e.weight_min,
        weight_max: e.weight_max,
        life_min: e.life_min,
        life_max: e.life_max,
        image: e.image,
        temp: e.temps.map(e=>e.name),
          };
    });
    //console.log(dbDog)
    return dbDog;
  } catch (error) {
    console.log(error);
  }
};

const getAllDogs = async () => {
  try {
    const apiInfo = await getApiDogs();
    const dbInfo = await getDbDogs();
    const allInfo = await apiInfo.concat(dbInfo);
    return allInfo;
  } catch (error) {
    return error;
  }
};
const getDogs = async (req, res) => {
  try {
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
      const dogName = await allDogs.filter((e) =>
        e.name.toLowerCase().startsWith(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("Perro no encontrado");
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    return error;
  }
};

const getDogsfitered = async (req, res) => {
  try {
    const { existent } = req.params;
    if (existent == "exist") {
      const apiDogs = await getApiDogs();
      res.status(200).send(apiDogs);
    } else if (existent == "created") {
      const dbDogs = await getDbDogs();
      res.status(200).send(dbDogs);
    }
  } catch (error) {
    return error;
  }
};

const postDog = async (req, res) => {
  let {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_min,
    life_max,
    image,
    temp,
  } = req.body;
  let idv4 = uuidv4();
  const dbId = idv4.slice(0, 4);
  try {
    const dog = {
      id: dbId,
      name: name,
      height_min: height_min,
      height_max: height_max,
      weight_min: weight_min,
      weight_max: weight_max,
      life_min: life_min,
      life_max: life_max,
      image: image || "https://th.bing.com/th/id/R.e95c6ea4db3b79eda1c8a94c886c8071?rik=GhlexzYxf4p9RQ&pid=ImgRaw&r=0",
    };
    if(isNaN(name) === false)return res.send("El valor ingresado no debe ser numerico.")
    if(!name || !height_min || !height_max || !weight_min ||!weight_max || !life_min || !life_max || !temp ){
      return res.send("Falta informcion.")}
    const validate = await Dog.findOne({
      where:{name}
    })
    if(!validate) {
      let newDog = await Dog.create(dog);
      let dogDb = await Temp.findAll({
        where: { name: temp },
      });
      await newDog.addTemp(dogDb);
      res.status(200).send(dog);
    }else {
      res.status(400).send('perro ya existente')
    }
  }catch(error) {
    console.log(error)
  }
};



const getDogById = async (req, res) => {
  try {
    const id = req.params.id;
    const dogsTotal = await getAllDogs();
    let dogsId = await dogsTotal.filter((e) => e.id == id);
    dogsId.length
      ? res.status(200).send(dogsId)
      : res.status(404).send("Perro no encontrado");
  } catch (error) {
    return error;
  }
};

const putDog = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_min,
      life_max,
      image,
      temp,
    } = req.body;
    const editDog = await Dog.update(
      {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_min,
        life_max,
        image,
        temp,
      },
      { where: { id } }
    );
    res.send(editDog);
  } catch (error) {
    return error;
  }
};

const deleteDog = async (req, res) => {
  try {
    const {id} = req.params;
    await Dog.destroy({
      where: { id: id },
    });
    return res.send("deleted!");
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDogs,
  postDog,
  getDogById,
  putDog,
  deleteDog,
  getDogsfitered,
};

/*


const deleteDog = async (req, res) => {
  try {
    const id = req.params.id;
    await Dog.destroy({
      where: { id: id },
    });
    return res.send("deleted!");
  } catch (error) {
    return error;
  }
};
"id": "5d5f",
    "name": "Bond",
    "height_min": "10",
    "height_max": "15",
    "weight_min": "10",
    "weight_max": "15",
    "life_min": "10",
    "life_max": "15"
*/

//   try{

/*
const getDogs = async (req, res) => {
    const { name } = req.query;
    let allDogs = await getAllDogs();
    if (name) {
      const dogName = await allDogs.filter((e) =>
        e.name.toLowerCase().startsWith(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("Perro no encontrado");
    } else {
      res.status(200).send(allDogs);
    }
  };


  temp.map(async (t) => {
      const [postTemp, succes] = await Temp.findOrCreate({
        where: {
          name: t,
        },
        defaults: { name: t },
      });
      await  DogCreated.addTemp(postTemp);
    });
*/

// const validate = await Dog.findOne({where:temp})
// if(!validate){
//     const dogCreate =await Dog.create(dog)
//     let dogDb = await Temp.findAll({
//      where:temp
//     })
//     console.log(dogDb)
//     await dogCreate.addType(dogDb)
//     res.status(200).send("Perro creado con exito")
// }else{
//     let dogDb2 = await Temp.findAll({
//         where:temp
//     })
//     await validate.addTemp(dogDb2)
//     res.status(200).send('Perro creado con exito')
// }

// try {
//   const {
//     name,
//     height_min,
//     height_max,
//     weight_min,
//     weight_max,
//     life_min,
//     life_max,
//     image,
//     temp
//   } = req.body;

//   const idv4 = uuidv4();
//   let dbId = idv4.slice(0, 4);
//   let DogCreated = await Dog.create({
//     id: dbId,
//     name: name,
//     height_min: height_min,
//     height_max: height_max,
//     weight_min: weight_min,
//     weight_max: weight_max,
//     life_min: life_min,
//     life_max: life_max,
//     image: image,
//   });
//   DogCreated.addTemp(temp);
//   res.status(201).json(DogCreated)
//   res.status(200).send("Perro creado con exito!");
// } catch (error) {
//   return error;
// }
