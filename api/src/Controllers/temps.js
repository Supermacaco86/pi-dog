const axios = require("axios");
const { Dog, Temp } = require("../db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { API_KEY } = process.env;




const getTemp = async (req, res) => {
  const dbTemp = await Temp.findAll();
  const dbUtilInfo = dbTemp.map((e) => e.name);
  try {
    if (!dbTemp.length) {
      let temp = [];
      const apiData = await axios.get('https://api.thedogapi.com/v1/breeds');
      const apiTemperaments = apiData.data.map(e => e.temperament).join(', ').split(', ')
      apiTemperaments.map((e) => {
          if (!temp.includes(e) && e !== "") {
              temp.push(e)
          }
        
      })
      temp.forEach((e) => {
        Temp.findOrCreate({
          where: { name: e },
        });
      });
      const dbTemps = await Temp.findAll();
      const utilInfo = dbTemps.map((e) => e.name);
      res.status(200).send(utilInfo);
    } else {
      res.status(200).send(dbUtilInfo);
    }
  } catch (error) {
    res.status(400).send("Temperament error");
  }
};

module.exports = {
  getTemp,
};



/*
const getTemp = async (req, res) => {
  const apiData = await axios.get('https://api.thedogapi.com/v1/breeds')
  let temperaments = apiData.data.map((e) => e.temperament)
  temperaments = temperaments.join(", ").split(", ");
  temperaments = temperaments.filter((e) => e);
  temperaments = [...new Set(temperaments)].sort();
  temperaments.forEach((e) => {
    Temp.findOrCreate({
    where: { name: e },
});
const allTemperament = await Temp.findAll();
console.log(allTemperament)
  res.send(allTemperament);
});
}
*/