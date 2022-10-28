const { arrayPost } = require("../../public/arrayPost");
const { Post, Order } = require("../../db");

const getDbInfo = async () => {
  return await Post.findAll({
    include: {
      model: Order,
    },
    paranoid: false,
  });
};

const getAllPosts = async () => {
  const dbInfo = await getDbInfo();
  return dbInfo;
};

module.exports = { getAllPosts };
