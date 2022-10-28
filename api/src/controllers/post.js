const { Sequelize, Op } = require("sequelize");
const { Post, Order, Diet } = require("../db");
const { getAllPosts } = require("./utils/getAllPosts");

const getPosts = async (req, res) => {
  let posts;
  const id = req.query.id;
  let respuesta = { respuesta: "no existe el post" };
  try {
    posts = await getAllPosts();
    if (id) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
          respuesta = posts[i];
        }
      }
    } else respuesta = posts;
    res.status(200).send(respuesta);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const postPost = async (req, res) => {
  let { date, amount, productId } = req.body;

  try {
    if (!date) {
      throw new Error("Debe definirse una fecha");
    }
    if (amount < 1) {
      throw new Error("La cantidad a publicar debe ser mayor a 0");
    }
    if (!productId) {
      throw new Error("Debe definirse los productos");
    }
    let newPost = await Post.create({
      date,
      amount,
    });
    newPost.setProduct(productId);
    res.send(newPost);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
};

const putPost = async (req, res) => {
  const { id } = req.params;
  let { amount } = req.body;
  try {
    if (amount < 0) {
      throw new Error("El stock de esta publicación ha llegado a 0");
    }
    let postToModify = await Post.update({
      amount: amount
    },
      { where: { id: id } }

    );
    let postModified = await Post.findByPk(id);

    res.send(postModified);
  } catch (e) {
    res.status(500).send(`${e}`);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  let postToDelete = await Post.findByPk(id);
  if (!postToDelete) {
    return res.status(404).json({
      error: "There is not posts with this ID",
    });
  }
  await Post.destroy({ where: { id: id } });
  res.send(`El producto con el id ${id} fue eliminado`);
};
const getPostById = async (req, res) => {
  let { id } = req.params;
  try {
    let postId = await Post.findAll({
      where: {id},
      include: {
        model: Order,
      },
      paranoid: false,
    });

    res.status(200).send(postId);
  } catch (e) {
    res.status(404).send("No hay posts de ese id");
  }
};

const restorePost = async (req, res) => {
  let { id } = req.params;
  try {
    await Post.restore({
      where: {
        id: id,
      },
    });
    const restoredPost = await Post.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(restoredPost);
  } catch (error) {
    res.status(400).send("Hubo un problema recuperando el post");
  }
};

const disablePost = async (req, res) => {
  let { id } = req.params;
  try {
    await Post.destroy({
      where: {
        id: id,
      },
    });
    const disablePost = await Post.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(disablePost);
  } catch (error) {
    res.status(400).send("Hubo un problema al eliminar el post");
  }
};

const disablePostForce = async (req, res) => {
  let { id } = req.params;
  try {
    await Post.destroy({
      where: {
        id: id,
        date: { [Op.lt]: Sequelize.literal("NOW()") },
      },
      force: true,
    });
    const disablePostForce = await Post.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(disablePostForce);
  } catch (error) {
    res.status(400).send("Hubo un problema al eliminar el post");
  }
};

module.exports = {
  getPostById,
  getPosts,
  postPost,
  putPost,
  deletePost,
  restorePost,
  disablePost,
  disablePostForce,
};
