const { Order, Post } = require("../db");
const { arrayOrder } = require("../public/api.js");

const getApiInfo = async () => {
  let objRes = arrayOrder.map((order) => {
    return {
      id: order.id,
      date: order.date,
      state: order.state,
      review: order.review,
    };
  });
  return objRes;
};

const getDbInfo = async () => {
  return await Order.findAll({
    include: {
      model: Post,
      attributes: ["id"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllData = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const validateNewOrder = (newOrder) => {
  const { state, review } = newOrder;

  if (!state || !review) throw Error("Faltan parametros necesarios");
  if (typeof state !== "string")
    throw Error("el estado debe ser en formato texto");
  if (review < 1 || review > 5)
    throw Error("rating debe ser un número entre 1 y 5");
  return true;
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    let orderId;
    if (id.length < 6) {
      orderId = arrayOrder.filter((order) => order.id === +id);

      res.status(200).json(orderId);
    } else {
      orderId = await Order.findByPk(id);
      res.status(200).json(orderId);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllOrder = async (req, res) => {
  const { state } = req.query;
  try {
    let orderList = await getAllData();
    if (state) {
      let searchState = orderList.filter((order) =>
        order.state.toLowerCase().includes(state.toLocaleLowerCase())
      );
      searchState.length
        ? res.status(200).send(searchState)
        : res
            .status(404)
            .send(`No se encontró ninguna orden con el estado: ${state}`);
    } else {
      res.status(200).send(orderList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const postOrder = async (req, res) => {
  let { state, review, postId } = req.body;
  const newOrder = { state, review, postId };

  try {
    if (validateNewOrder(newOrder)) {
      newOrder.state = newOrder.state.toLocaleLowerCase();
      let orderCreated = await Order.create({ ...newOrder });
      // console.log(orderCreated.__proto__);
      if (orderCreated) {
        let postDB = await Post.findAll({
          where: {
            name: amount,
          },
        });

        await orderCreated.addPosts(postDB);

        return res.send("Orden creada con exito");
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ msj: error.message });
  }
};
module.exports = {
  getOrderById,
  getAllOrder,
  postOrder,
};