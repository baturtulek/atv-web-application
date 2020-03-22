module.exports = function (sequelize, DataTypes) {
  const towedVehicle = sequelize.define(
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
        references: {
          model: 'USER',
          key: 'id',
        },
      },
      parkingLotId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'PARKING_LOT',
          key: 'id',
        },
      },
      stateId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'VEHICLE_STATE',
          key: 'id',
        },
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
  return towedVehicle;
};