const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      realValue: {
        type: DataTypes.INTEGER,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        isUrl: true,
      },
    },
    {
      createdAt: true,
      updatedAt: true,
      deletedAt: "deletedAt",
      paranoid: true,
      timeStamps: true,
    }
  );
};
