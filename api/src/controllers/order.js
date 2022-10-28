const { Order, Post } = require("../db");
const { arrayOrder } = require("../public/arrayOrder.js");

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
  return await Order.findAll();
};

const getAllData = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const validateNewOrder = (newOrder) => {
  const { state, reviewValue } = newOrder;

  if (!state || !reviewValue) throw Error("Faltan parametros necesarios");
  if (typeof state !== "string")
    throw Error("el estado debe ser en formato texto");
  if (reviewValue < 1 || reviewValue > 5)
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
  const { state, customerId } = req.query;
  let orders;
  try {
    orders = await getAllData();
    if (customerId) {
      orders = orders.filter(o => {
        return o.customerId === customerId
      })
      if (!orders.length) {
        throw new Error('No hay ordenes asociadas a ese consumidor')
      };
    }
    if (state) {
      orders = orders.filter(o =>
        o.state === state)
      if (!orders.length) {
        throw new Error('No hay ordenes con ese estado')
      };

    }

    res.status(200).send(orders);
  } catch (e) {
    res.status(404).send(e.message);
  }
};


const postOrder = async (req, res) => {
  let { date, amount, state, postId, customerId, reviewValue, reviewComment } = req.body;
  try {
    if (!amount) {
      throw new Error("Debe definirse una cantidad");
    }
    if (!postId) {
      throw new Error("La orden debe estar asociada a un post");
    }
    let newOrder = await Order.create({
      date,
      amount,
      state,
      reviewValue,
      reviewComment,
      postId,
      customerId,

    });
    newOrder.setPost(postId);
    let post = await Post.findByPk(postId);
    if (newOrder.amount > post.amount || post.amount === 0) {
      throw new Error('No se pueden generar nuevas ordenes porque el producto está agotado')
    }
    await Post.update(
      { amount: post.amount - newOrder.amount },
      { where: { id: postId } });
    res.send(newOrder);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  let orderToDelete = await Order.findByPk(id);
  if (!orderToDelete) {
    return res.status(404).json({
      error: "No hay orders con ese ID",
    });
  }
  await Order.destroy({ where: { id: id } });
  res.send(`La order con el id ${id} fue eliminado`);
};

const putOrder = async (req, res) => {
  const { id } = req.params;
  let { state } = req.body;
  try {
    if (!state) {
      throw new Error("No se recibio parametro state");
    }
    await Order.update(
      { state },
      { where: { id } });
    let orderModificated = await Order.findByPk(id)
    res.send(orderModificated);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
};
const putOrderReview = async (req, res) => {
  const { id } = req.params;
  let { reviewValue, reviewComment } = req.body;
  try {
    if (!reviewValue) {
      throw new Error("No se recibio parametro review");
    }
    await Order.update(
      { reviewValue, reviewComment },
      { where: { id } });
    let orderModificated = await Order.findByPk(id)
    res.send(orderModificated);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
};
module.exports = {
  getOrderById,
  getAllOrder,
  postOrder,
  deleteOrder,
  putOrder,
  putOrderReview
};
