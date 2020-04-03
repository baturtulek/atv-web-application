module.exports = (sequelize, DataTypes) => {
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

  ParkingLot.associate = (DB) => {
    DB.ParkingLot.hasOne(DB.User, {
      foreignKey: 'id',
      sourceKey: 'staffId',
    });
    DB.ParkingLot.hasOne(DB.ParkingType, {
      foreignKey: 'id',
      sourceKey: 'parkingTypeId',
    });
  };
  return ParkingLot;
};
