const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("customer", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // TODO cambiar datatype a ENUM con los partidos de buenos aires
    city: {
      type: DataTypes.ENUM([
        "Palermo",
        "Retiro",
        "Recoleta",
        "Almagro",
        "Puerto Madero",
        "Linier",
      ]),
      allowNull: false,
    },
  });
};
