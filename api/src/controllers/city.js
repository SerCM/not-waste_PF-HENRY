const { City } = require("../db");
const { arraycity } = require("../public/arrayCity.js");

const getCityInfo = (req, res) => {
  let json = arraycity.map((e) => {
    return {
      id: e.id,
      name: e.name,
    };
  });
  json.forEach((e) => {
    City.findAll({
      where: {
        name: e.name,
        id: e.id,
      },
    });
  });
  return res.status(200).send(json);
};

const postCity = async (req, res) => {
  let { name } = req.body;
  try {
    if (!name) {
      throw new Error("El campo del nombre de la ciudad es obligatorio");
    }

    let newCity = await City.create({
      name,
    });
    res.send(newCity);
  }

 catch (e) {
  res.status(500).send(`${e}`);
}

}

module.exports = {
  getCityInfo,
  postCity
}
