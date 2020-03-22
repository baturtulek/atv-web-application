module.exports = function (sequelize, DataTypes) {
  const ParkingLot = sequelize.define(
    'ParkingLot',
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
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
      staffId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      parkingTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'PARKING_LOT',
    },
  );

  ParkingLot.associate = function (models) {
    models.ParkingLot.hasOne(models.User, {
      foreignKey: 'id',
      sourceKey: 'staffId',
    });
    models.ParkingLot.hasOne(models.ParkingType, {
      foreignKey: 'id',
      sourceKey: 'parkingTypeId',
    });
  };
  return ParkingLot;
};
