module.exports = function (sequelize, DataTypes) {
  const discount = sequelize.define(
    'Discount',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      transferDiscount: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      parkDiscount: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'DISCOUNT',
    },
  );
  return discount;
};
