module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    'Vehicle',
    {
      plate: {
        type: DataTypes.STRING(12),
        allowNull: false,
        defaultValue: '',
        primaryKey: true,
      },
      chassisNo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      trusteeNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      vehicleTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      engineNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      colorId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      modelYear: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      bodyTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      brandId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      ownerProfileId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'VEHICLE',
    },
  );

  Vehicle.associate = (db) => {
    db.Vehicle.hasMany(db.TowedVehicle, {
      foreignKey: 'plate',
      sourceKey: 'plate',
    });
    db.Vehicle.hasOne(db.VehicleType, {
      foreignKey: 'id',
      sourceKey: 'vehicleTypeId',
    });
    db.Vehicle.hasOne(db.VehicleColor, {
      foreignKey: 'id',
      sourceKey: 'colorId',
    });
    db.Vehicle.hasOne(db.VehicleBodyStyle, {
      foreignKey: 'id',
      sourceKey: 'bodyTypeId',
    });
    db.Vehicle.hasOne(db.VehicleBrand, {
      foreignKey: 'id',
      sourceKey: 'brandId',
    });
  };
  return Vehicle;
};
