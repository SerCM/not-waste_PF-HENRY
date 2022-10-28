const arraySeller = require("../../public/newSeller-model.json");
const { Seller, Diet, City, Product, Post, Order } = require("../../db");

const getDbInfo = async () => {
  return await Seller.findAll({
    include: [
      {
        model: City,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Product,
        include: [
          {
            model: Post,
            include: {
              model: Order,
            },
            paranoid: false,
          },
          {
            model: Diet,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
        paranoid: false,
      },
    ],
    paranoid: false,
  });
};

const getAllSellers = async () => {
  const dbInfo = await getDbInfo();

  return dbInfo;
};

module.exports = { getAllSellers };
