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
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'TOWED_VEHICLE',
    },
  );

  TowedVehicle.associate = (models) => {
    models.TowedVehicle.belongsTo(models.Vehicle, {
      foreignKey: 'plate',
      sourceKey: 'plate',
    });
    models.TowedVehicle.hasOne(models.User, {
      foreignKey: 'id',
      sourceKey: 'staffId',
    });
    models.TowedVehicle.hasOne(models.ParkingLot, {
      foreignKey: 'id',
      sourceKey: 'parkingLotId',
    });
    models.TowedVehicle.hasOne(models.VehicleState, {
      foreignKey: 'id',
      sourceKey: 'stateId',
    });
  };
  return TowedVehicle;
};
