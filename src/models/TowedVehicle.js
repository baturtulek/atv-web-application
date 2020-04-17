module.exports = (sequelize, DataTypes) => {
  const TowedVehicle = sequelize.define(
    'TowedVehicle',
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
      note: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      staffId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      parkingLotId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      stateId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      entranceParkingLotDate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      exitParkingLotDate: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      receiver: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE(),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'TOWED_VEHICLE',
    },
  );

  TowedVehicle.associate = (DB) => {
    DB.TowedVehicle.belongsTo(DB.Vehicle, {
      foreignKey: 'plate',
      sourceKey: 'plate',
    });
    DB.TowedVehicle.hasOne(DB.User, {
      foreignKey: 'id',
      sourceKey: 'staffId',
    });
    DB.TowedVehicle.hasOne(DB.ParkingLot, {
      foreignKey: 'id',
      sourceKey: 'parkingLotId',
    });
    DB.TowedVehicle.hasOne(DB.VehicleState, {
      foreignKey: 'id',
      sourceKey: 'stateId',
    });
  };
  return TowedVehicle;
};
