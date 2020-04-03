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

  Vehicle.associate = (DB) => {
    DB.Vehicle.hasMany(DB.TowedVehicle, {
      foreignKey: 'plate',
      sourceKey: 'plate',
    });
    DB.Vehicle.hasOne(DB.VehicleType, {
      foreignKey: 'id',
      sourceKey: 'vehicleTypeId',
    });
    DB.Vehicle.hasOne(DB.VehicleColor, {
      foreignKey: 'id',
      sourceKey: 'colorId',
    });
    DB.Vehicle.hasOne(DB.VehicleBodyStyle, {
      foreignKey: 'id',
      sourceKey: 'bodyTypeId',
    });
    DB.Vehicle.hasOne(DB.VehicleBrand, {
      foreignKey: 'id',
      sourceKey: 'brandId',
    });
  };
  return Vehicle;
};
