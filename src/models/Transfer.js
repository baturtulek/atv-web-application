module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define(
    'Transfer',
    {
      plate: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      towedDate: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      parkingLotId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      staffId: {
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
      isInParkingLot: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'TRANSFER',
    },
  );

  Transfer.associate = (DB) => {
    DB.Transfer.hasOne(DB.User, {
      foreignKey: 'id',
      sourceKey: 'staffId',
    });
    DB.Transfer.hasOne(DB.ParkingLot, {
      foreignKey: 'id',
      sourceKey: 'parkingLotId',
    });
  };

  return Transfer;
};
