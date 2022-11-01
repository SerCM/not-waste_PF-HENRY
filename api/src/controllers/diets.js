const { Diet } = require("../db");
const { diets } = require("../public/diets");

const getDiets = async (req, res) => {
  let json = diets.map((e) => {
    return {
      id: e.id,
      name: e.name,
    };
  });
  json.forEach((e) => {
    Diet.findAll({
      where: {
        name: e.name,
        id: e.id,
      },
    });
  });
  return res.status(200).send(json);
};
const postDiet = async (req, res) => {
  let { name } = req.body;
  try {
    if (!name) {
      throw new Error("El campo del nombre de la dieta es obligatorio");
    }

    let newDiet = await Diet.create({
      name,
    });
    res.send(newDiet);
  }

 catch (e) {
  res.status(500).send(`${e}`);
}

}

module.exports = {
  getDiets,
  postDiet
};
