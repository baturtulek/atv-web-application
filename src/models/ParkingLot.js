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

  ParkingLot.associate = (db) => {
    db.ParkingLot.hasOne(db.User, {
      foreignKey: 'id',
      sourceKey: 'staffId',
    });
    db.ParkingLot.hasOne(db.ParkingType, {
      foreignKey: 'id',
      sourceKey: 'parkingTypeId',
    });
  };
  return ParkingLot;
};
