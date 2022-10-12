const express = require("express");
const { Manager } = require("../db");
const morgan = require("morgan");

const router = express.Router();
router.use(morgan("dev"));

const getApiInfo = async () => {
  const arrayManagers = [
    {
      id: 01,
      name: "Pedro",
      password: "abc123",
    },
    {
      id: 02,
      name: "Juan",
      password: "abc456",
    },
    {
      id: 03,
      name: "Pedro",
      password: "abc789",
    },
  ];

  let objRes = arrayManagers.map((manager) => {
    return {
      id: manager.id,
      name: manager.name,
      password: manager.password,
    };
  });
  return objRes;
};

const getDbInfo = async () => {
  return await Manager.findAll();
};

const getAllManager = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const getManagerById = async (req, res) => {
  const { id } = req.params;

  try {
    const arrayManagers = [
      {
        id: 01,
        name: "Pedro",
        password: "abc123",
      },
      {
        id: 02,
        name: "Juan",
        password: "abc456",
      },
      {
        id: 03,
        name: "Pedro",
        password: "abc789",
      },
    ];
    if (id.length < 6) {
      let managerId = arrayManagers.filter((manager) => manager.id === +id);

      res.status(200).json(managerId);
    } else {
      let managerId = await Manager.findByPk(id);
      res.status(200).json(managerId);
    }
  } catch (error) {
    console.log(error);
  }
};

const getManager = async (req, res) => {
  const { name } = req.query;
  try {
    let managerList = await getAllManager();
    if (name) {
      let searchName = managerList.filter((manager) =>
        manager.name.toLowerCase().includes(name.toLocaleLowerCase())
      );
      searchName.length
        ? res.status(200).send(searchName)
        : res
            .status(404)
            .send(`No se encontró ningun manager con el nombre: ${name}`);
    } else {
      res.status(200).send(managerList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getManager,
  getManagerById,
};
