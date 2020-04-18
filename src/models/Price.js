module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    'Price',
    {
      plate: {
        type: DataTypes.STRING(12),
        allowNull: false,
        primaryKey: true,
      },
      towedDate: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      discount: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      fullPrice: {
        type: DataTypes.DOUBLE(),
        allowNull: false,
      },
      discountPrice: {
        type: DataTypes.DOUBLE(),
        allowNull: true,
      },
      receiver: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'PRICE',
    },
  );

  Price.associate = (DB) => {
    DB.Price.hasOne(DB.Discount, {
      foreignKey: 'id',
      sourceKey: 'roleId',
    });
  };
  return Price;
};
