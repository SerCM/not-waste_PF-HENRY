const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        isAfter: new Date(),
      },
      amount: {
        type: DataTypes.INTEGER,
        min: 0,
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
